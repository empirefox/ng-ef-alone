import template from 'lodash-es/template';

import { GovalidatorXjsonV4, govalidatorNamesV4 } from './validators';

const asArgs = {
  required: (args: string[]) => ({ name: args[0] }),
  nodefine: (args: string[]) => ({ name: args[0] }),
  failed: (args: string[]) => ({ name: args[0], value: args[1], validator: args[2] }),
  typefailed: (args: string[]) => ({ name: args[0], validator: args[1], gotype: args[2] }),
};

export class GovalidatorErrorTranslatorV4 {
  private validators = new Map<string, Function>();

  constructor({ validators }: { validators: GovalidatorXjsonV4 }) {
    govalidatorNamesV4.forEach(name => this.validators.set(name, template(validators[name])));
  }

  // args[0] is translated field
  translate(validator: string, args: string[]): string {
    return this.validators.get(validator)(asArgs[validator](args));
  }

}
