import { Component, Input, OnInit } from '@angular/core';

import { FormattedFieldErrors, FieldType, FieldErrorsStyles } from '../types';

export const defaultFieldErrorsStyles: FieldErrorsStyles = {
  showType: FieldType.NAMED,
  showName: true,
  groupClass: 'err-group',
  fieldNameClass: 'err-name',
  itemsClass: 'err-items',
  itemClass: 'err-item',
};

const typeMap = {
  '-': [FieldType.UNPARSED],
  '': [FieldType.UNAMED],
};

@Component({
  selector: 'ef-field-errors',
  templateUrl: './field-errors.component.html',
})
export class FieldErrorsComponent implements OnInit {
  @Input() field: FormattedFieldErrors;
  @Input() styles: FieldErrorsStyles;

  constructor() { }

  ngOnInit() {
    this.styles = Object.assign({}, defaultFieldErrorsStyles, this.styles);
  }

  get show() {
    return this.field && (typeMap[this.field.name] & this.styles.showType);
  }

}
