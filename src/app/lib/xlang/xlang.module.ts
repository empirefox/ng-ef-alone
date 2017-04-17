import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpModule } from '@angular/http';

import { ErrorModule } from '../error';
import { DEFAULT_XLANG, XLANG_JSON_CONFIGS } from './token';
import { XlangService } from './xlang.service';
import { XlangJsonConfig } from './xlang-json.config';
import { XlangJsonService } from './xlang-json.service';

@NgModule({
  imports: [HttpModule, ErrorModule],
  exports: [HttpModule, ErrorModule],
})
export class XlangModule {

  static forRoot(configs: XlangJsonConfig[], defaultLang = 'en-US'): ModuleWithProviders {
    return {
      ngModule: XlangModule,
      providers: [
        XlangService,
        XlangJsonService,
        { provide: DEFAULT_XLANG, useValue: defaultLang },
        { provide: XLANG_JSON_CONFIGS, useValue: configs },
      ]
    };
  }

}
