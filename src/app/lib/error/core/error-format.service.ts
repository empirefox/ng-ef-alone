import { Injectable, Optional, PipeTransform } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { RemoteErrorService } from '../../reporter';
import { XlangJsonService } from '../../xlang';
import { FieldsErrors } from './fields-errors';

import {
  IParseError,
  FormattedFieldErrors,
  ServerError,
  ServerErrorConstructor,
  ErrorConfig,
  ErrorParser,
} from './types';

const unparsedKey = '-';

@Injectable()
export class ServerErrorFormatService {
  private parsers = new Map<any, ErrorParser>();

  constructor(
    private remoteErrorService: RemoteErrorService,
    private xlangJsonService: XlangJsonService,
    @Optional() private config: ErrorConfig) {
    this.config = config || { parsers: [] };
    this.config.parsers.forEach(p => {
      const xlang = p.xlang || {};
      const keys = Object.keys(xlang);
      const xvalues = keys.map(key => xlangJsonService.load(xlang[key]));
      p._xlang = Observable.forkJoin(...xvalues).map(values => {
        const xlangs: Dict<Object> = {};
        keys.forEach((key, i) => xlangs[key] = values[i]);
        return xlangs;
      });
      this.parsers.set(p.parser, p);
    });
  }

  throw(error: Response | FieldsErrors | any, fieldXlangId: any): Observable<FieldsErrors> {
    return this.format(error, fieldXlangId).mergeMap(err => Observable.throw(err));
  }

  // StatusBadRequest or StatusPreconditionFailed?
  format(error: Response | FieldsErrors | any, fieldXlangId: any): Observable<FieldsErrors> {
    if (error instanceof FieldsErrors) {
      return Observable.of(error);
    }

    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json();

      const parser = this.errorParser(body);
      if (parser) {
        return Observable.forkJoin(
          this.parsers.get(body.Parse)._xlang.take(1),
          this.xlangJsonService.load(fieldXlangId).take(1),

        ).map((xlangs, fieldTr) => {
          const translator = parser.translator ? new parser.translator(xlangs) : undefined;
          return new FieldsErrors(new parser.type(body, fieldTr, this.config, this.remoteErrorService, translator, parser.config));
        });
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

    return this.xlangJsonService.load(fieldXlangId).take(1).map(fieldTr => {
      return new FieldsErrors(null, {
        [unparsedKey]: {
          field: unparsedKey,
          name: fieldTr ? fieldTr[unparsedKey] || unparsedKey : unparsedKey,
          errors: [errMsg]
        }
      });
    });
  }

  errorParser(body: { Parse?: number }): ErrorParser | undefined {
    if (body && this.config && this.parsers.get(body.Parse)) {
      return this.config.parsers[body.Parse];
    }
  }

}
