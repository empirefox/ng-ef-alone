import { Injectable } from '@angular/core';
import * as showJSError from 'show-js-error/dist/show-js-error';

import { RemoteErrorHandler } from '../errors';

// only should be used in dev mode.
@Injectable()
export class ShowJSErrorHandler extends RemoteErrorHandler {

  constructor() {
    super();
    showJSError.init();
  }

  log(message: String) {
    return showJSError.show(message);
  }

  error(error: Error) {
    return showJSError.show(error);
  }

}
