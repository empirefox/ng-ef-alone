import { Inject, Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { IHttp } from '../../common/http';
import { IPayPayload, PayConfig } from '../models';
import { PAY_HTTP } from '../models/token';

@Injectable()
export class PayService {

  constructor(
    @Inject(PAY_HTTP) private http: IHttp,
    private config: PayConfig) {
  }

  cash(orderId: number, key: string): Observable<Response> {
    const payload: IPayPayload = { OrderID: orderId, Key: key };
    return this.http.post(this.config.postPayCashUrl, JSON.stringify(payload));
  }

  points(orderId: number, key: string): Observable<Response> {
    const payload: IPayPayload = { OrderID: orderId, Key: key };
    return this.http.post(this.config.postPayPointsUrl, JSON.stringify(payload));
  }

}
