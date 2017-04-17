import { Injectable } from '@angular/core';
import * as LE from 'le_js';

import { RemoteErrorHandler } from '../errors';
import { LogentriesConfig } from './le.config';

@Injectable()
export class LeHandler extends RemoteErrorHandler {

  constructor(private config: LogentriesConfig) {
    super();
    LE.init(config);
  }

  log(message: String) {
    LE.log(message);
  }

  error(error: Error) {
    LE.error(error);
  }

}
