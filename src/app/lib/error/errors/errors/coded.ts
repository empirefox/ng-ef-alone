import { RemoteErrorService } from '../remote-error.service';

import {
  IParseError,
  FormattedFieldErrors,
  ServerErrorConstructor,
  ServerError,
  ErrorConfig,
  ICodedErrorConfig,
} from '../types';

export class CodedError implements ServerError {
  private result: Dict<FormattedFieldErrors>;
  private config: ICodedErrorConfig;

  constructor(
    private err: IParseError,
    private tr: Object,
    private errorConfig: ErrorConfig,
    private remoteErrorService: RemoteErrorService) { }

  errors(): Dict<FormattedFieldErrors> {
    if (!this.result) {
      this.init();
      this.compute(this.err);
    }
    return this.result;
  }

  private init() {
    this.result = {};
    this.config = (this.errorConfig && this.errorConfig.codedError) || {};
  }

  private compute(fieldError: IParseError) {
    const err = this.tr && this.tr[fieldError.Code] ? this.tr[fieldError.Code] : `Error: ${fieldError.Code}`;
    const one: FormattedFieldErrors = {
      field: '',
      name: '',
      errors: [err],
    };
    this.result = { '': one };

    const codes = this.config.postCode;
    if (codes && (~codes.findIndex(code => code === fieldError.Code))) {
      this.remoteErrorService.error(new Error(`${err}. ${fieldError.Err || ''}`));
    }
  }

}

const _: ServerErrorConstructor = CodedError;
