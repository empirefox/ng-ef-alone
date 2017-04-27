import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EfHomeModule } from './ef-home/ef-home.module';
import { EfReporterModule } from './ef-reporter/ef-reporter.module';
import { EfXlangModule } from './ef-xlang/ef-xlang.module';
import { EfSvg4eModule } from './ef-svg4e/ef-svg4e.module';
import { EfErrorModule } from './ef-error/ef-error.module';
import { EfPayModule } from './ef-pay/ef-pay.module';

import { PayService } from './services/pay.service';

@NgModule({
  imports: [
    CommonModule,

    EfHomeModule,
    EfReporterModule,
    EfXlangModule,
    EfSvg4eModule,
    EfErrorModule,
    EfPayModule,
  ],
  exports: [
    EfHomeModule,
    EfReporterModule,
    EfXlangModule,
    EfSvg4eModule,
    EfErrorModule,
    EfPayModule,
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
