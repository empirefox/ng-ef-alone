import { InjectionToken } from '@angular/core';

import { IHttp } from '../../common';

export const PAY_HTTP = new InjectionToken<IHttp>('PayHttp');
