import { Injectable } from '@angular/core';

import { RemoteErrorHandler } from './remote-error.service';

@Injectable()
export class ConsoleErrorHandler extends RemoteErrorHandler {

  log(data: any) { console.log(data); }

  error(data: Error) { console.error(data); }

}

export const CONSOLE_ERROR_REPORTER_PROVIDER = {
  provide: RemoteErrorHandler,
  useClass: ConsoleErrorHandler,
  multi: true,
};

