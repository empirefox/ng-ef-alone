import { ServerError, FormattedFieldErrors } from './types';

const unparsedKey = '-';

export class FieldsErrors {
  private _dict: Dict<FormattedFieldErrors>;
  private _array: FormattedFieldErrors[];
  private _str: string;

  constructor(private serverError: ServerError, dict?: Dict<FormattedFieldErrors>) {
    this._dict = dict;
  }

  get dict() {
    if (!this._dict) {
      this._dict = this.serverError.errors();
    }
    return this._dict;
  }

  get array(): FormattedFieldErrors[] {
    if (!this._array) {
      const keys = Object.keys(this.dict).filter(key => key && key !== unparsedKey);
      this._array = [unparsedKey, '', ...keys].map(key => this.dict[key]);
    }
    return this._array;
  }

  json(): FieldsErrors {
    return this;
  }

  toString(): string {
    if (!this._str) {
      this._str = this.array.map(errs => `${errs.name}\n${errs.errors.join('\n')}`).join('\n');
    }
    return this._str;
  }

}
