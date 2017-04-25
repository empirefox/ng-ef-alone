import { ModuleWithProviders, NgModule } from '@angular/core';

import { RemoteErrorHandler } from '../core';
import { RollbarConfig } from './rollbar.config';
import { RollbarHandler } from './rollbar.handler';

@NgModule()
export class RollbarModule {
  static forRoot(config: RollbarConfig): ModuleWithProviders {
    return {
      ngModule: RollbarModule,
      providers: [
        RollbarHandler,
        { provide: RollbarConfig, useValue: config },
        { provide: RemoteErrorHandler, useExisting: RollbarHandler, multi: true },
      ],
    };
  }
}
