import { PipeTransform } from '@angular/core';

import { RemoteErrorService } from './remote-error.service';

export interface IParseError {
  Parse: number;
  Code?: number;
  Err?: any;
}

export enum FieldType {
  X = 0,
  UNPARSED = 1 << 0,
  UNAMED = 1 << 1,
  NAMED = 1 << 2,

  UNEXPECTED = UNPARSED | UNAMED,
  ALL = UNEXPECTED | NAMED,
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
  new (err: IParseError, tr: Object, errorConfig: ErrorConfig, remoteErrorService: RemoteErrorService): ServerError;
}

export interface IValidatorV9FieldError {
  Tag: string;
  ActualTag: string;
  Namespace: string;
  StructNamespace: string;
  Field: string;
  StructField: string;
  Value: any;
  Param: string;
  Type: string;
}

// name is translated
export interface ValidatorV9FieldErrorBuilder {
  error: (name: string, err: IValidatorV9FieldError) => string;
}

export interface IGovalidatorV4NameError {
  Name: string;
  Err: string;
  CustomErrorMessageExists: boolean;
}

export type IGovalidatorV4InteralError = IGovalidatorV4NameError | string;
export type IGovalidatorV4Error = IGovalidatorV4InteralError | IGovalidatorV4InteralError[];

// name is translated
export interface Govalidator4Translator {
  required: (name: string) => string;
  nodefine: (name: string) => string;
  failed: (name: string, value: string, validator: string) => string;
  typefailed: (name: string, validator: string, gotype: string) => string;
}

// config

export interface ICodedErrorConfig {
  postCode?: number[];
}

export interface IValidatorV9Config {
  errorBuilder?: ValidatorV9FieldErrorBuilder;
}

export interface IGovalidator4Config {
  translator?: Govalidator4Translator;
}

export class ErrorConfig {
  parses: Dict<ServerErrorConstructor>;
  postUnparsed?: boolean;
  codedError?: ICodedErrorConfig;
  validatorV9?: IValidatorV9Config;
  govalidatorV4?: IGovalidator4Config;
}
