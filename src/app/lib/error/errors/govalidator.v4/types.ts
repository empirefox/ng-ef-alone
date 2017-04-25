export interface IGovalidatorV4NameError {
  Name: string;
  Err: string;
  CustomErrorMessageExists: boolean;
}

export type IGovalidatorV4InteralError = IGovalidatorV4NameError | string;
export type IGovalidatorV4Error = IGovalidatorV4InteralError | IGovalidatorV4InteralError[];
