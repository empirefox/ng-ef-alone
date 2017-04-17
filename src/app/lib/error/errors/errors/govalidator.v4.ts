import { RemoteErrorService } from '../remote-error.service';

import {
  IParseError,
  FormattedFieldErrors,
  ServerError,
  ServerErrorConstructor,
  IGovalidatorV4Error,
  ErrorConfig,
  IGovalidator4Config,
} from '../types';

export const translateRegexV4 = {
  required: /non zero value required/,
  nodefine: /required to at least have one validation/,
  failed: /(\S+) does.+validate as (\S+)/,
  typefailed: /Validator (\S+).+support kind (\S+)/,
};

export class GovalidatorErrorV4 implements ServerError {

  private result: Dict<FormattedFieldErrors>;
  private validators: string[];
  private config: IGovalidator4Config;

  constructor(
    private err: IParseError,
    private tr: Object,
    private errorConfig: ErrorConfig,
    private remoteErrorService: RemoteErrorService) { }

  errors(): Dict<FormattedFieldErrors> {
    if (!this.result) {
      this.init();
      this.compute(this.err.Err);
    }
    return this.result;
  }

  private init() {
    this.result = {};
    const config = this.config = (this.errorConfig && this.errorConfig.govalidatorV4) || {};
    this.validators = config.translator ? Object.keys(translateRegexV4) : [];
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
    const result = this.result;
    if (err) {
      const one: FormattedFieldErrors = result[field] || {
        field,
        name: null,
        errors: [],
      };

      // translate err
      this.validators.some(validator => {
        const match = err.match(translateRegexV4[validator]);
        if (match) {
          match[0] = one.name = this.tr ? this.tr[field] || field : field;
          return err = this.config.translator[validator](...match);
        }
      });

      one.errors.push(err);
      result[field] = one;
    }
    if (!field) {
      this.remoteErrorService.error(new Error(`"${err}" should not happen in govalidator!`));
    }
  }

}

const _: ServerErrorConstructor = GovalidatorErrorV4;
