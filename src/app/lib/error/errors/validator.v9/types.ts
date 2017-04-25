export interface IValidatorV9FieldError {
  Tag: string;
  ActualTag: string;
  Namespace: string;
  StructNamespace: string;
  Field: string;
  StructField: string;
  Value: any;
  Kind: number;
  Type: string;
  Param: string;

  name: string; // translated field name
  target: string; // translated target field name
  key: string; // json key to template
}

export interface ValidatorConfigV9 {
  fieldTargetTagRe?: RegExp;
  needKindCheck?: Set<string>;
  needTypeCheck?: Set<string>;
}

export const defaultValidatorConfigV9: ValidatorConfigV9 = {
  fieldTargetTagRe: /field$/,
  needKindCheck: new Set('len,min,max,lt,lte,gt,gte'.split(',')),
  needTypeCheck: new Set('lt,lte,gt,gte'.split(',')),
};
