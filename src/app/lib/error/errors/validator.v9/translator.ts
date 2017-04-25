import template from 'lodash-es/template';

import { IValidatorV9FieldError } from './types';

// name is translated
export class ValidatorErrorTranslatorV9 {
  private tags = new Map<string, any>();

  constructor({ tags }: { tags?: Dict<string> } = {}) {
    Object.keys(tags || {}).forEach(name => this.tags.set(name, template(tags[name])));
  }

  translate(err: IValidatorV9FieldError): string {
    const tags = this.tags;
    const { name, key, Param: param } = err;
    return tags.has(key) ? tags.get(key)(err) : `${name}: ${key}(${param})`;
  }

}
