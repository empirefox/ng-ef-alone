import { Injectable } from '@angular/core';

import { RemoteErrorHandler } from './errors';

@Injectable()
export class ConsoleErrorHandler extends RemoteErrorHandler {

  log(data: any) { console.log(data); }

  error(data: Error) { console.error(data); }

}
