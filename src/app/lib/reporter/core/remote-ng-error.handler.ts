import { ErrorHandler, Injectable } from '@angular/core';

import { RemoteErrorService } from './remote-error.service';

@Injectable()
export class RemoteNgErrorHandler implements ErrorHandler {

  constructor(private remoteErrorService: RemoteErrorService) { }

  handleError(err: any): void {
    this.remoteErrorService.error(err);
  }
}

export const REMOTE_NG_ERROR_HANDLER = {
  provide: ErrorHandler,
  useClass: RemoteNgErrorHandler,
};
