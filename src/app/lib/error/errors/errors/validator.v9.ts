import { RemoteErrorService } from '../remote-error.service';

import {
  IParseError,
  FormattedFieldErrors,
  ServerError,
  ServerErrorConstructor,
  IValidatorV9FieldError,
  ErrorConfig,
  IValidatorV9Config,
} from '../types';

export class ValidatorErrorV9 implements ServerError {
  private result: Dict<FormattedFieldErrors>;
  private config: IValidatorV9Config;

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
    this.config = (this.errorConfig && this.errorConfig.validatorV9) || {};
  }

  private compute(fieldErrors: IValidatorV9FieldError[]) {
    const result = this.result;
    fieldErrors.forEach(fieldError => {
      const field = fieldError.Field;
      const errs = result[field] || [];
      const name = this.tr ? this.tr[field] || field : field;
      const one: FormattedFieldErrors = result[field] || {
        field,
        name,
        errors: [],
      };

      one.errors.push(this.build(name, fieldError));
      result[field] = one;
    });
  }

  private build(name: string, err: IValidatorV9FieldError): string {
    const param = err.Param ? `(${err.Param})` : '';
    const builder = this.config.errorBuilder;
    return builder ? builder.error(name, err) : `${name}: ${err.Tag}${param}`;
  }

}

const _: ServerErrorConstructor = ValidatorErrorV9;
