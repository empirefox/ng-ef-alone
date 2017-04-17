import { Inject, Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ua, IHttp, QrConfig } from '../../common';

import {
  PayConfig, IWxPayConfig,
  IWxPayPayload, IWxPayArgs, IWxPayNativeResponse,
} from '../models';
import { PAY_HTTP } from '../models/token';

declare var WeixinJSBridge;

@Injectable()
export class WxService {
  private config: IWxPayConfig;

  constructor(
    @Inject(PAY_HTTP) private http: IHttp,
    private payConfig: PayConfig) {
    this.config = payConfig.wx;
  }

  // qr code if success
  // weixin://wxpay/bizpayurl?pr=EBbeFN2 for 189.cn
  payInNative(orderId: number, qr: QrConfig): Observable<string> {
    const payload: IWxPayPayload = { OrderID: orderId };
    return this.http.post(this.config.postPayWithQrUrl, JSON.stringify(payload)).
      map(res => qr.generate((<IWxPayNativeResponse>res.json()).codeUrl));
  }

  // auto choose wx or h5, orderquery order if success
  payInMobile(orderId: number): Observable<Response> {
    return ua.isWeChat ? this.payInWx(orderId) : this.payInH5(orderId);
  }

  // 302 if success
  payInH5(orderId: number): Observable<Response> {
    const payload: IWxPayPayload = { OrderID: orderId };
    return this.http.post(this.config.postPayInH5Url, JSON.stringify(payload));
  }

  // orderquery order if success
  afterPayInH5(orderId: number): Observable<Response> {
    const payload: IWxPayPayload = { OrderID: orderId };
    return this.http.post(this.config.postAfterPayUrl, JSON.stringify(payload));
  }

  // orderquery order if success
  payInWx(orderId: number): Observable<Response> {
    const data: IWxPayPayload = { OrderID: orderId };
    const payload = JSON.stringify(data);
    return this.http.post(this.config.postPayInWxUrl, payload).
      mergeMap(res => this.requestPayInWx(<IWxPayArgs>res.json())).
      mergeMap(_ => this.http.post(this.config.postAfterPayUrl, payload));
  }

  requestPayInWx(payargs: IWxPayArgs): Observable<any> {
    return new Observable(observer => {
      const onBridgeReady = () => {
        console.log('onBridgeReady started');
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest',
          payargs,
          (res) => {
            console.log('getBrandWCPayRequest response:', res);
            // 使用以上方式判断前端返回,微信团队郑重提示:res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
            if (res.err_msg === 'get_brand_wcpay_request:ok') {
              observer.next(res);
              observer.complete();
            } else {
              observer.error(res);
            }
          }
        );
      };

      if (typeof WeixinJSBridge === 'undefined') {
        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, true);
      } else {
        onBridgeReady();
      }
    });
  }

}
