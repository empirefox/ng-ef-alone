import { Injectable, Optional, PipeTransform } from '@angular/core';
import { Response } from '@angular/http';

import { RemoteErrorService } from './remote-error.service';
import { FieldsErrors } from './fields-errors';

import {
  IParseError,
  FormattedFieldErrors,
  ServerError,
  ServerErrorConstructor,
  ErrorConfig,
} from './types';

const unparsedKey = '-';

@Injectable()
export class ServerErrorFormatService {

  constructor(
    private remoteErrorService: RemoteErrorService,
    @Optional() private config: ErrorConfig) { }

  // StatusBadRequest or StatusPreconditionFailed?
  format(error: Response | FieldsErrors | any, tr: Object): FieldsErrors {
    if (error instanceof FieldsErrors) {
      return error;
    }

    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json();

      const ErrorClass = this.errorClass(body);
      if (ErrorClass) {
        return new FieldsErrors(new ErrorClass(body, tr, this.config, this.remoteErrorService));
      }

      const err = (body && body.error) || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }

    if (this.config.postUnparsed) {
      const err = error instanceof Error ? error : new Error(errMsg);
      this.remoteErrorService.error(err);
    }

    return new FieldsErrors(null, {
      [unparsedKey]: {
        field: unparsedKey,
        name: tr ? tr[unparsedKey] || unparsedKey : unparsedKey,
        errors: [errMsg]
      }
    });
  }

  errorClass(body: { Parse?: number }): ServerErrorConstructor | undefined {
    if (body && body.Parse && this.config) {
      return this.config.parses[body.Parse];
    }
  }

}
