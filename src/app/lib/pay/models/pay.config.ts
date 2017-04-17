export class PayConfig {
  tplXjsonId: string;
  formXjsonId: string;
  postPayCashUrl: string;
  postPayPointsUrl: string;
  wx: IWxPayConfig;
}

export interface IWxPayConfig {
  postPayInWxUrl: string;
  postPayInH5Url: string;
  postPayWithQrUrl: string;
  postAfterPayUrl: string;
}
