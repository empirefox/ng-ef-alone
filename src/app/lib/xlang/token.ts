import { InjectionToken } from '@angular/core';

import { XlangJsonConfig } from './types';

export const XLANG_JSON_CONFIGS = new InjectionToken<XlangJsonConfig>('XlangJsonConfigs');
export const DEFAULT_XLANG = new InjectionToken<string>('DefaultXlang');
