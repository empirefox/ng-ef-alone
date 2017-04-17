import { Inject, Injectable, Optional } from '@angular/core';

// TODO use winston when it is ready.
// see https://github.com/winstonjs/winston/issues/287
export abstract class RemoteErrorHandler {
  abstract log(data: any);
  abstract error(data: Error);
}

@Injectable()
export class RemoteErrorService {

  constructor( @Optional() @Inject(RemoteErrorHandler) private handlers: RemoteErrorHandler[]) {
    this.handlers = handlers || [];
  }

  log(data: any) {
    this.handlers.forEach(handler => handler.log(data));
  }

  error(data: Error) {
    this.handlers.forEach(handler => handler.error(data));
  }

}
