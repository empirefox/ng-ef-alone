import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayModule, PayConfig, PayMethod } from '../../lib/pay';
import { api, xlangPayTplId, xlangPayFormId } from '../core';
import { EfPayRoutingModule } from './ef-pay-routing.module';
import { EfPayComponent } from './ef-pay.component';

@NgModule({
  imports: [
    CommonModule,
    PayModule,
    EfPayRoutingModule
  ],
  declarations: [EfPayComponent]
})
export class EfPayModule { }

export function payConfigFactory(): PayConfig {
  return {
    recommend: PayMethod.wepay,
    tplXjsonId: xlangPayTplId,
    formXjsonId: xlangPayFormId,
    paykeyPattern: `\\d{6}`,
    postPayCashUrl: api.PostPayCash,
    postPayPointsUrl: api.PostPayPoints,
    wepay: {
      postPayInWechatUrl: api.PostWepayInWechat,
      postPayInH5Url: api.PostWepayInH5,
      postPayWithQrUrl: api.PostWepayInWithQr,
      postAfterPayUrl: api.PostWepayAfterPay,
    },
  };
}
