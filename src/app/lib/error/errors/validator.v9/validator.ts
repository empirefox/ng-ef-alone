import { GoKind } from '../../../common';
import { RemoteErrorService } from '../../../reporter';

import {
  IParseError,
  FormattedFieldErrors,
  ServerError,
  ServerErrorConstructor,
  ErrorConfig,
  ErrorParser,
} from '../../core';

import { IValidatorV9FieldError, defaultValidatorConfigV9, ValidatorConfigV9 } from './types';
import { ValidatorErrorTranslatorV9 } from './translator';

export class ValidatorErrorV9 implements ServerError {
  private result: Dict<FormattedFieldErrors>;

  static forRoot(parserKey: any, tagsXlangId: string, config?: ValidatorConfigV9): ErrorParser {
    return {
      parser: parserKey,
      type: ValidatorErrorV9,
      translator: ValidatorErrorTranslatorV9,
      xlang: { tags: tagsXlangId },
      config,
    };
  }

  constructor(
    private err: IParseError,
    private fieldTr: Object,
    private errorConfig: ErrorConfig,
    private remoteErrorService: RemoteErrorService,
    private translator: ValidatorErrorTranslatorV9,
    private config: ValidatorConfigV9) {
    this.config = Object.assign({}, defaultValidatorConfigV9, config);
  }

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

  private compute(fieldErrors: IValidatorV9FieldError[]) {
    const result = this.result;
    fieldErrors.forEach(fieldError => {
      const { Field: field, Tag: tag } = fieldError;
      const errs = result[field] || [];
      const name = fieldError.name = this.fieldTr ? this.fieldTr[field] || field : field;
      const one: FormattedFieldErrors = result[field] || {
        field,
        name,
        errors: [],
      };

      if (this.config.fieldTargetTagRe.test(tag)) {
        const param = fieldError.Param;
        fieldError.target = this.fieldTr ? this.fieldTr[param] || param : param;
      }

      if (this.config.needKindCheck.has(tag)) {
        const { Kind: kind, Type: type } = fieldError;
        switch (kind) {
          case GoKind.String:
            fieldError.key = `${tag}-${type}`;
            break;
          case GoKind.Slice:
          case GoKind.Map:
          case GoKind.Array:
            fieldError.key = `${tag}-items`;
            break;
          case GoKind.Struct:
            if (type === 'time.Time' && this.config.needTypeCheck.has(tag)) {
              fieldError.key = `${tag}-datetime`;
            } else {
              this.remoteErrorService.error(new Error(`tag '${tag}' cannot be used on a struct type.`));
            }
            break;
          default:
            fieldError.key = `${tag}-number`;
        }
      } else {
        fieldError.key = tag;
      }

      one.errors.push(this.translator.translate(fieldError));
      result[field] = one;
    });
  }

}

const _: ServerErrorConstructor = ValidatorErrorV9;
