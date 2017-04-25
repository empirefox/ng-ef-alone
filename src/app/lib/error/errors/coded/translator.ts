import { IParseError } from '../../core';

export class CodedErrorTranslator {
  private codes = new Map<string | number, string>();

  constructor({ codes }: { codes?: Dict<string> } = {}) {
    Object.keys(codes || {}).forEach(name => this.codes.set(name, codes[name]));
  }

  translate(err: IParseError): string {
    const codes = this.codes;
    const code = err.Code;
    return codes.has(code) ? codes.get(code) : `Error not found: ${err.Code}`;
  }

}
