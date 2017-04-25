// name is translated
export interface GovalidatorXjsonV4 {
  /**
   * `${name} is required`
   */
  required: string;

  /**
   * `${name} is not defined`
   */
  nodefine: string;

  /**
   * `${name} ${value} ${validator} failed`
   */
  failed: string;

  /**
   * `${name} ${validator} ${gotype} failed`
   */
  typefailed: string;
}

export const translateRegexV4 = {
  required: /non zero value required/,
  nodefine: /required to at least have one validation/,
  failed: /(\S+) does.+validate as (\S+)/,
  typefailed: /Validator (\S+).+support kind (\S+)/,
};

export const govalidatorNamesV4 = Object.keys(translateRegexV4);
