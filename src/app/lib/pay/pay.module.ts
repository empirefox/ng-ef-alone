import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MdButtonModule,
  MdCardModule,
  MdListModule,
  MdIconModule,
  MdInputModule,
  MdProgressSpinnerModule,
  MdToolbarModule,
} from '@angular/material';

import { ErrorModule } from '../error';

import { AUTH_HTTP } from '../common';
import { SVG4E_DEP, Svg4eModule } from '../svg4e';

import { PAY_HTTP } from './models/token';
import { PayConfig } from './models';
import { WxService, PayService } from './services';
import { PayComponent } from './pay/pay.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MdButtonModule,
    MdCardModule,
    MdListModule,
    MdIconModule,
    MdInputModule,
    MdProgressSpinnerModule,
    MdToolbarModule,

    ErrorModule,
    Svg4eModule,
  ],
  declarations: [PayComponent],
  exports: [
    ReactiveFormsModule,
    MdButtonModule,
    MdCardModule,
    MdListModule,
    MdIconModule,
    MdInputModule,
    MdProgressSpinnerModule,
    MdToolbarModule,

    ErrorModule,
    Svg4eModule,
    PayComponent,
  ]
})
export class PayModule {

  static forRoot(configFactory: () => PayConfig, useExistingHttp: any = AUTH_HTTP): ModuleWithProviders {
    return {
      ngModule: PayModule,
      providers: [
        WxService,
        PayService,
        { provide: PayConfig, useFactory: configFactory },
        { provide: PAY_HTTP, useExisting: useExistingHttp },
        { provide: SVG4E_DEP, useValue: 'ef-pay', multi: true },
      ]
    };
  }

}
