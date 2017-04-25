import { Injectable } from '@angular/core';
import { RollbarConfig } from './rollbar.config';
import * as Rollbar from 'rollbar-browser';

import { RemoteErrorHandler } from '../core';

@Injectable()
export class RollbarHandler extends RemoteErrorHandler {

  private rollbar: any;

  constructor(options: RollbarConfig) {
    super();
    this.rollbar = Rollbar.init(options);
  }

  log(message: String): Promise<any> {
    return this.rollbar.log(message);
  }

  error(error: Error): Promise<any> {
    return this.rollbar.error(error);
  }

}
