import { NgModule } from '@angular/core';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MdButtonModule,
  MdCardModule,
  MdListModule,
  MdIconModule,
  MdInputModule,
  MdProgressSpinnerModule,
  MdSidenavModule,
  MdToolbarModule,
} from '@angular/material';

import {
  ErrorsParser, api, DemoModule,
  xlangCodesId, xlangValidatorId, xlangGovalidatorId, xlangPayTplId, xlangPayFormId,
} from './demo';

import { AUTH_HTTP } from './lib/common';
import { ReporterModule } from './lib/reporter';
import { XlangModule, XlangJsonConfig } from './lib/xlang';
import { Svg4eModule, Svg4eBundle } from './lib/svg4e';
import { ErrorModule, ErrorConfig, CodedError, GovalidatorErrorV4, ValidatorErrorV9 } from './lib/error';
import { PayModule, PayConfig, PayMethod } from './lib/pay';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

export const xlangConfigs: XlangJsonConfig[] = [
  {
    id: xlangCodesId,
    langs: ['en', 'zh'],
    urlTemplate: '/i18n/CodedError/${lang}.json',
  },
  {
    id: xlangValidatorId,
    langs: ['en'],
    urlTemplate: '/i18n/validator.v9/xlang-${lang}.json',
  },
  {
    id: xlangGovalidatorId,
    langs: ['en'],
    urlTemplate: '/i18n/xlang-govalidator.v4/xlang-${lang}.json',
  },
  {
    id: xlangPayTplId,
    langs: ['en'],
    urlTemplate: '/assets/ef-pay/tpl-${lang}.json',
  },
  {
    id: xlangPayFormId,
    langs: ['en'],
    urlTemplate: '/assets/ef-pay/form-${lang}.json',
  },
];

export const errorConfig: ErrorConfig = {
  parsers: [
    CodedError.forRoot(ErrorsParser.ParseCode, xlangCodesId, { postCode: [500] }),
    ValidatorErrorV9.forRoot(ErrorsParser.ParseGinValidator, xlangValidatorId),
    GovalidatorErrorV4.forRoot(ErrorsParser.ParseGovalidator, xlangGovalidatorId),
  ],
  postUnparsed: true,
};

export const svg4eBundles: Svg4eBundle[] = [
  {
    name: 'ef-pay',
    url: '/assets/ef-pay/ef-pay.svg',
    class: '',
  },
];

export function payConfigFactory() {
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

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MdButtonModule.forRoot(),
    MdCardModule.forRoot(),
    MdListModule.forRoot(),
    MdIconModule.forRoot(),
    MdInputModule.forRoot(),
    MdProgressSpinnerModule.forRoot(),
    MdSidenavModule.forRoot(),
    MdToolbarModule.forRoot(),
    AppRoutingModule,
    DemoModule.forRoot(),

    ReporterModule.forRoot(),
    XlangModule.forRoot(xlangConfigs, 'zh'),
    Svg4eModule.forRoot(svg4eBundles),
    ErrorModule.forRoot(errorConfig),
    PayModule.forRoot(payConfigFactory),
  ],
  providers: [
    CurrencyPipe, DecimalPipe,
    { provide: AUTH_HTTP, useExisting: Http },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
