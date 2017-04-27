import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpModule } from '@angular/http';

import { ReporterModule } from '../reporter';
import { XlangJsonConfig } from './types';
import { DEFAULT_XLANG, XLANG_JSON_CONFIGS } from './token';
import { XlangService } from './xlang.service';
import { XlangJsonService } from './xlang-json.service';

@NgModule({
  imports: [HttpModule, ReporterModule],
  exports: [HttpModule, ReporterModule],
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
