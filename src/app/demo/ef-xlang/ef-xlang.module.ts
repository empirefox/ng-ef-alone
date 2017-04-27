import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdButtonModule } from '@angular/material';

import { XlangModule, XlangJsonConfig } from '../../lib/xlang';
import { xlangCodesId, xlangValidatorId, xlangGovalidatorId, xlangPayTplId, xlangPayFormId, xlangEfErrorDemoId } from '../core';
import { EfXlangRoutingModule } from './ef-xlang-routing.module';
import { EfXlangComponent } from './ef-xlang.component';

@NgModule({
  imports: [
    CommonModule,
    MdButtonModule,
    XlangModule,
    EfXlangRoutingModule
  ],
  declarations: [EfXlangComponent]
})
export class EfXlangModule { }

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
    urlTemplate: '/i18n/govalidator.v4/xlang-${lang}.json',
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

  {
    id: xlangEfErrorDemoId,
    langs: ['en'],
    urlTemplate: '/i18n/demo/ef-error-demo-${lang}.json',
  },
];
