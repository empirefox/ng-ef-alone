import { PipeTransform } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { RemoteErrorService } from '../../reporter';
import { FieldType } from './field.type';

export interface IParseError {
  Parse: number;
  Code?: number;
  Err?: any;
}

export interface FieldErrorsStyles {
  showType?: FieldType;
  showName?: boolean;
  groupClass?: string;
  fieldNameClass?: string;
  itemsClass?: string;
  itemClass?: string;
}

export interface FormattedFieldErrors {
  field: string;
  name: string;
  errors: string[];
}

export interface ServerError {
  errors(): Dict<FormattedFieldErrors>;
}

export interface ServerErrorConstructor {
  new (
    error: IParseError,
    fieldTr: Object,
    errorConfig: ErrorConfig,
    remoteErrorService: RemoteErrorService,
    translator: any,
    config?: any): ServerError;
}

export interface ErrorParser {
  parser: any;
  type: ServerErrorConstructor;
  translator: any;
  xlang: Dict<any>; // will be injected to translator
  config?: any;

  _translatorsByLang?: Map<string, any>;
  _translatorsLoadingByLang?: Map<string, Observable<any>>;
}

// config
export class ErrorConfig {
  parsers: ErrorParser[];
  postUnparsed?: boolean;
}
