import { RemoteErrorService } from '../../../reporter';

import {
  IParseError,
  FormattedFieldErrors,
  ServerErrorConstructor,
  ServerError,
  ErrorConfig,
  ErrorParser,
} from '../../core';

import { ICodedErrorConfig } from './types';
import { CodedErrorTranslator } from './translator';

export class CodedError implements ServerError {
  private result: Dict<FormattedFieldErrors>;

  static forRoot(parserKey: any, codesXlangId: any, config?: ICodedErrorConfig): ErrorParser {
    return {
      parser: parserKey,
      type: CodedError,
      translator: CodedErrorTranslator,
      xlang: { codes: codesXlangId },
      config,
    };
  }

  constructor(
    private err: IParseError,
    fieldTr: Object,
    private errorConfig: ErrorConfig,
    private remoteErrorService: RemoteErrorService,
    private translator: CodedErrorTranslator,
    private config: ICodedErrorConfig) {
    this.config = config || {};
  }

  errors(): Dict<FormattedFieldErrors> {
    if (!this.result) {
      this.init();
      this.compute(this.err);
    }
    return this.result;
  }

  private init() {
    this.result = {};
  }

  private compute(fieldError: IParseError) {
    const codes = this.config.postCode;
    if (codes && (~codes.findIndex(code => code === fieldError.Code))) {
      this.remoteErrorService.error(new Error(JSON.stringify(fieldError)));
    }

    const err = this.translator.translate(fieldError);
    const one: FormattedFieldErrors = {
      field: '',
      name: '',
      errors: [err],
    };
    this.result = { '': one };
  }

}

const _: ServerErrorConstructor = CodedError;
