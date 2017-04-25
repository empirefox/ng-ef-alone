import { Injectable } from '@angular/core';
import * as Bugsnag from 'bugsnag-js';

import { RemoteErrorHandler } from '../core';
import { BugsnapConfig } from './bugsnag.config';

@Injectable()
export class BugsnagHandler extends RemoteErrorHandler {

  constructor(config: BugsnapConfig) {
    super();
    const bugsnag: any = Bugsnag;
    bugsnag.apiKey = config.apiKey;
  }

  log(data: any) {
    Bugsnag.notify('Error', data);
  }

  error(data: Error) {
    Bugsnag.notifyException(data);
  }

}
