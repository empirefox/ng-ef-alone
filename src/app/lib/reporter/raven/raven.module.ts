import { ModuleWithProviders, NgModule } from '@angular/core';

import { RemoteErrorHandler } from '../core';
import { RavenConfig } from './raven.config';
import { RavenHandler } from './raven.handler';

@NgModule()
export class RavenModule {
  static forRoot(config: RavenConfig): ModuleWithProviders {
    return {
      ngModule: RavenModule,
      providers: [
        RavenHandler,
        { provide: RavenConfig, useValue: config },
        { provide: RemoteErrorHandler, useExisting: RavenHandler, multi: true },
      ],
    };
  }
}
