import { RemoteErrorService } from '../../../reporter';

import {
  IParseError,
  FormattedFieldErrors,
  ServerError,
  ServerErrorConstructor,
  ErrorConfig,
  ErrorParser,
} from '../../core';

import { IGovalidatorV4Error } from './types';
import { GovalidatorXjsonV4, govalidatorNamesV4, translateRegexV4 } from './validators';
import { GovalidatorErrorTranslatorV4 } from './translator';

export class GovalidatorErrorV4 implements ServerError {

  private result: Dict<FormattedFieldErrors>;

  static forRoot(parserKey: any, validatorsXlangId: any): ErrorParser {
    return {
      parser: parserKey,
      type: GovalidatorErrorV4,
      translator: GovalidatorErrorTranslatorV4,
      xlang: { validators: validatorsXlangId },
    };
  }

  constructor(
    private err: IParseError,
    private fieldTr: Object,
    private errorConfig: ErrorConfig,
    private remoteErrorService: RemoteErrorService,
    private translator: GovalidatorErrorTranslatorV4) { }

  errors(): Dict<FormattedFieldErrors> {
    if (!this.result) {
      this.init();
      this.compute(this.err.Err);
    }
    return this.result;
  }

  private init() {
    this.result = {};
  }

  private compute(errs: IGovalidatorV4Error | IGovalidatorV4Error[]) {
    if (!errs) {
      // nothing
    } else if (typeof errs === 'string') {
      this.put(errs);
    } else if (Array.isArray(errs)) {
      (<IGovalidatorV4Error[]>errs).forEach(err => this.compute(err));
    } else if (typeof errs === 'object') {
      if (errs.Name || errs.Err) {
        this.put(errs.Err, errs.Name);
      } else {
        this.put(JSON.stringify(errs));
      }
    } else {
      this.put(String(errs));
    }
  }

  private put(err: string, field = '') {
    if (!field) {
      this.remoteErrorService.error(new Error(`"${err}" should not happen in govalidator!`));
    }

    const result = this.result;
    if (err) {
      const one: FormattedFieldErrors = result[field] || {
        field,
        name: null,
        errors: [],
      };

      // translate err
      govalidatorNamesV4.some(validator => {
        const match = err.match(translateRegexV4[validator]);
        if (match) {
          match[0] = one.name = this.fieldTr ? this.fieldTr[field] || field : field;
          return (err = this.translator.translate(validator, match)) as any;
        }
      });

      one.errors.push(err);
      result[field] = one;
    }
  }

}

const _: ServerErrorConstructor = GovalidatorErrorV4;
