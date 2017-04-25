import { ModuleWithProviders, NgModule } from '@angular/core';

import { RemoteErrorHandler } from '../core';
import { BugsnapConfig } from './bugsnag.config';
import { BugsnagHandler } from './bugsnag.handler';

@NgModule()
export class RavenModule {
  static forRoot(config: BugsnapConfig): ModuleWithProviders {
    return {
      ngModule: RavenModule,
      providers: [
        BugsnagHandler,
        { provide: BugsnapConfig, useValue: config },
        { provide: RemoteErrorHandler, useExisting: BugsnagHandler, multi: true },
      ],
    };
  }
}
