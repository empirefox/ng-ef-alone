import { ModuleWithProviders, NgModule } from '@angular/core';

import { RemoteErrorHandler } from '../core';
import { ShowJSErrorHandler } from './show.handler';

@NgModule()
export class ShowJSErrorModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ShowJSErrorModule,
      providers: [
        ShowJSErrorHandler,
        { provide: RemoteErrorHandler, useExisting: ShowJSErrorHandler, multi: true },
      ],
    };
  }
}
