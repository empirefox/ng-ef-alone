import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdButtonModule } from '@angular/material';

import { PayModule } from '../lib/pay';

import { DemoRoutingModule } from './demo-routing.module';
import { BuyComponent } from './buy/buy.component';

import { PayService } from './pay/pay.service';

@NgModule({
  imports: [
    CommonModule,
    MdButtonModule,
    DemoRoutingModule,
    PayModule,
  ],
  declarations: [BuyComponent],
  exports: [
    MdButtonModule,
    PayModule,
    BuyComponent,
  ]
})
export class DemoModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DemoModule,
      providers: [
        PayService,
      ]
    };
  }

}
