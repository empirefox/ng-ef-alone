import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { FormattedFieldErrors, FieldType, FieldErrorsStyles } from '../core';

export const defaultFieldErrorsStyles: FieldErrorsStyles = {
  showType: FieldType.ALL,
  showName: false,
  groupClass: 'err-group',
  fieldNameClass: 'err-name',
  itemsClass: 'err-items',
  itemClass: 'err-item',
};

const typeMap = new Map([
  ['-', FieldType.UNPARSED],
  ['', FieldType.UNAMED],
]);

@Component({
  selector: 'ef-field-errors',
  templateUrl: './field-errors.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldErrorsComponent implements OnInit {
  @Input() field: FormattedFieldErrors;

  ss: FieldErrorsStyles;
  private _styles: FieldErrorsStyles;

  constructor() { }

  @Input() get styles() { return this._styles; }
  set styles(value: FieldErrorsStyles) {
    if (this._styles !== value) {
      this._styles = value;
      this.ss = Object.assign({}, defaultFieldErrorsStyles, value);
    }
  }

  get show() {
    return this.field && (typeMap.has(this.field.name) ? typeMap.get(this.field.name) & this.ss.showType : 1);
  }

  ngOnInit() {
    this.styles = this.styles || {};
  }

}
