import { InjectionToken } from '@angular/core';

import { XlangJsonConfig } from './xlang-json.config';

export const XLANG_JSON_CONFIGS = new InjectionToken<XlangJsonConfig>('XlangJsonConfigs');
export const DEFAULT_XLANG = new InjectionToken<string>('DefaultXlang');
