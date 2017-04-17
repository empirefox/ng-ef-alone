import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorConfig, RemoteErrorHandler, RemoteErrorService, ServerErrorFormatService, FieldErrorsComponent } from './errors';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    FieldErrorsComponent,
  ],
  exports: [
    FieldErrorsComponent,
  ]
})
export class ErrorModule {
  static forRoot(config: ErrorConfig): ModuleWithProviders {
    return {
      ngModule: ErrorModule,
      providers: [
        RemoteErrorService,
        ServerErrorFormatService,
        { provide: ErrorConfig, useValue: config },
      ],
    };
  }
}
