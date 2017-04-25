import { PayMethod } from './pay-method';

export class PayConfig {
  recommend?: PayMethod;
  tplXjsonId: string;
  formXjsonId: string;
  paykeyPattern: string;
  postPayCashUrl: string;
  postPayPointsUrl: string;
  wepay: IWxPayConfig;
}

export interface IWxPayConfig {
  postPayInWechatUrl: string;
  postPayInH5Url: string;
  postPayWithQrUrl: string;
  postAfterPayUrl: string;
}
