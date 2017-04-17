import { Pipe, PipeTransform } from '@angular/core';
import { isNumeric } from '@angular/common/src/pipes/number_pipe';

export interface IParseError {
  Parse: number;
  Code?: number;
  Err?: any;
}

@Pipe({ name: 'govalidator' })
export class GovalidatorPipe implements PipeTransform {
  transform(value: any) {
  }
}
