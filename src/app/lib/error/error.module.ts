import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { XlangModule } from '../xlang';

import { ErrorConfig, ServerErrorFormatService } from './core';
import { FieldErrorsComponent } from './field-errors/field-errors.component';

@NgModule({
  imports: [
    CommonModule,
    XlangModule,
  ],
  declarations: [
    FieldErrorsComponent,
  ],
  exports: [
    XlangModule,
    FieldErrorsComponent,
  ]
})
export class ErrorModule {
  static forRoot(config: ErrorConfig): ModuleWithProviders {
    return {
      ngModule: ErrorModule,
      providers: [
        ServerErrorFormatService,
        { provide: ErrorConfig, useValue: config },
      ],
    };
  }
}
