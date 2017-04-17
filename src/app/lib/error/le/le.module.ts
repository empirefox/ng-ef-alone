import { ModuleWithProviders, NgModule } from '@angular/core';

import { RemoteErrorHandler } from '../errors';
import { LogentriesConfig } from './le.config';
import { LeHandler } from './le.handler';

@NgModule()
export class LeModule {
  static forRoot(config: LogentriesConfig): ModuleWithProviders {
    return {
      ngModule: LeModule,
      providers: [
        LeHandler,
        { provide: LogentriesConfig, useValue: config },
        { provide: RemoteErrorHandler, useExisting: LeHandler, multi: true },
      ],
    };
  }
}
