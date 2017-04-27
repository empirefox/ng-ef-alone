import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { MdButtonModule } from '@angular/material';

import { ErrorModule, ErrorConfig, CodedError, GovalidatorErrorV4, ValidatorErrorV9 } from '../../lib/error';
import { ErrorsParser, xlangCodesId, xlangValidatorId, xlangGovalidatorId } from '../core';
import { EfErrorRoutingModule } from './ef-error-routing.module';
import { EfErrorComponent } from './ef-error.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    MdButtonModule,
    ErrorModule,
    EfErrorRoutingModule
  ],
  declarations: [EfErrorComponent]
})
export class EfErrorModule { }

export const errorConfig: ErrorConfig = {
  parsers: [
    CodedError.forRoot(ErrorsParser.ParseCode, xlangCodesId, { postCode: [1] }),
    ValidatorErrorV9.forRoot(ErrorsParser.ParseGinValidator, xlangValidatorId),
    GovalidatorErrorV4.forRoot(ErrorsParser.ParseGovalidator, xlangGovalidatorId),
  ],
  postUnparsed: true,
};
