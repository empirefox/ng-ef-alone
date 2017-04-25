import { NgModule, ModuleWithProviders } from '@angular/core';

import { RemoteErrorService } from './core';

@NgModule()
export class ReporterModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ReporterModule,
      providers: [
        RemoteErrorService,
      ],
    };
  }
}
