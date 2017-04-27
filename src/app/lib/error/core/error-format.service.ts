import { Injectable, Optional, PipeTransform } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { RemoteErrorService } from '../../reporter';
import { XlangService, XlangJsonService, XlangResult } from '../../xlang';
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
    private xlangService: XlangService,
    private xlangJsonService: XlangJsonService,
    @Optional() private config: ErrorConfig) {
    this.config = config || { parsers: [] };
    this.config.parsers.forEach(p => {
      p._translatorsByLang = new Map<string, any>();
      p._translatorsLoadingByLang = new Map<string, Observable<any>>();
      this.parsers.set(p.parser, p);
    });
  }

  throw(error: Response | FieldsErrors | any, fieldXlangId?: any): Observable<FieldsErrors> {
    return this.format(error, fieldXlangId).mergeMap(err => Observable.throw(err));
  }

  // StatusBadRequest or StatusPreconditionFailed?
  format(error: Response | FieldsErrors | any, fieldXlangId?: any): Observable<FieldsErrors> {
    if (error instanceof FieldsErrors) {
      return Observable.of(error);
    }

    const fieldXlang = fieldXlangId ? this.xlangJsonService.load(fieldXlangId).take(1) : Observable.of({});

    let errMsg: string;
    if (error instanceof Response) {
      let err;
      try {
        const body: IParseError = error.json();
        const parser = this.errorParser(body);
        if (parser) {
          return Observable.forkJoin(
            this.xlangService.lang$.take(1),
            fieldXlang,
          ).mergeMap(([lang, fieldTr]) => {
            return this.getTranslator(parser, lang).map(translator => {
              return new FieldsErrors(new parser.type(body, fieldTr.json, this.config, this.remoteErrorService, translator, parser.config));
            });
          }).share();
        }

        const errBody: any = body || '';
        err = errBody.error || JSON.stringify(errBody);
      } catch (_) {
        err = error.text();
      }
      errMsg = `${error.status || 'ERR_CONNECTION_REFUSED'} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }

    if (this.config.postUnparsed) {
      const err = error instanceof Error ? error : new Error(errMsg);
      this.remoteErrorService.error(err);
    }

    return fieldXlang.map(fieldTr => {
      return new FieldsErrors(null, {
        [unparsedKey]: {
          field: unparsedKey,
          name: fieldTr ? fieldTr[unparsedKey] || unparsedKey : unparsedKey,
          errors: [errMsg]
        }
      });
    }).share();
  }

  getTranslator(parser: ErrorParser, lang: string): Observable<any> {
    const { _translatorsByLang: translators, _translatorsLoadingByLang: loadings, translator: Translator } = parser;
    if (!Translator) {
      return Observable.of();
    } else if (translators.has(lang)) {
      return Observable.of(translators.get(lang));
    } else if (loadings.has(lang)) {
      return loadings.get(lang);
    } else {
      const translator$ = this.xlangJsonService.takeAll(parser.xlang, lang)
        .take(1)
        .map(jsons => new Translator(jsons))
        .do(translator => translators.set(lang, translator))
        .finally(() => loadings.delete(lang))
        .share();
      loadings.set(lang, translator$);
      return translator$;
    }
  }

  errorParser(body: IParseError): ErrorParser | undefined {
    if (body) {
      return this.parsers.get(body.Parse);
    }
  }

}
