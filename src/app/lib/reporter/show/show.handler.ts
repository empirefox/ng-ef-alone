import { Injectable } from '@angular/core';

import { RemoteErrorHandler } from '../core';

const showJSError = window['showJSError'];

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
