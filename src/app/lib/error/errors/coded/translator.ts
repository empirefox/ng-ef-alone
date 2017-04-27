import { IParseError } from '../../core';

export class CodedErrorTranslator {
  codes: string[];

  constructor({ codes }: { codes?: string[] } = {}) {
    this.codes = codes || [];
  }

  translate(err: IParseError): string {
    const codes = this.codes;
    const code = err.Code;
    const value = codes[code];
    return value ? value : `Error not found: ${code}`;
  }

}
