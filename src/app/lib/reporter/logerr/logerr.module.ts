import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { RemoteErrorHandler } from '../core';
import { LogerrConfig } from './logerr.config';
import { LogerrHandler } from './logerr.handler';

@NgModule({
  imports: [HttpModule],
  exports: [HttpModule],
})
export class ShowJSErrorModule {
  static forRoot(configs: LogerrConfig[]): ModuleWithProviders {
    const providers = configs.map(config => ({ provide: LogerrConfig, useValue: config, multi: true }));
    return {
      ngModule: ShowJSErrorModule,
      providers: [
        ...providers,
        LogerrHandler,
        { provide: RemoteErrorHandler, useExisting: LogerrHandler, multi: true },
      ],
    };
  }
}
