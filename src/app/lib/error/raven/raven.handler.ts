import { Injectable } from '@angular/core';
import * as Raven from 'raven-js';

import { RemoteErrorHandler } from '../errors';
import { RavenConfig } from './raven.config';

@Injectable()
export class RavenHandler extends RemoteErrorHandler {

  constructor(config: RavenConfig) {
    super();
    let dsn = config.dsn;
    dsn = config.useLocal ? dsn.replace('sentry.io', 'localhost') : dsn;
    Raven.config(dsn, config.options).install();
  }

  log(data: any) {
    Raven.captureMessage(data);
  }

  error(data: Error) {
    Raven.captureException(data);
  }

  breadcrumb(crumb: Object) {
    Raven.captureBreadcrumb(crumb);
  }

}
