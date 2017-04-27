import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Http, Response, ResponseOptions } from '@angular/http';

import { GoKind } from '../../lib/common';
import {
  FieldErrorsStyles, FieldsErrors, ServerErrorFormatService,
  IValidatorV9FieldError, IGovalidatorV4Error,
  FieldType,
} from '../../lib/error';
import { ErrorsParser, CodedError, xlangCodesId, xlangEfErrorDemoId } from '../core';

const codedError = new Response(new ResponseOptions({
  status: 400,
  body: `{
    "Parse": ${ErrorsParser.ParseCode},
    "Code": ${CodedError.Error},
    "Err": "Failed to get id"
  }`,
}));

const codedErrorReport = new Response(new ResponseOptions({
  status: 500,
  body: `{
    "Parse": ${ErrorsParser.ParseCode},
    "Code": 1,
    "Err": "Failed to call google"
  }`,
}));

const validatorV9FieldErrors = <IValidatorV9FieldError[]>[
  {
    Tag: 'iscolor',
    ActualTag: 'hexcolor|rgb|rgba|hsl|hsla',
    Namespace: 'color',
    StructNamespace: 'Color',
    Field: 'color',
    StructField: 'Color',
    Value: '39F',
    Kind: GoKind.String,
    Type: 'string',
    Param: '',
  },
  {
    Tag: 'gte',
    ActualTag: 'gte',
    Namespace: 'age',
    StructNamespace: 'Age',
    Field: 'age',
    StructField: 'Age',
    Value: 10,
    Kind: GoKind.Uint,
    Type: 'uint',
    Param: '20',
  },
];
const validatorErrorV9 = new Response(new ResponseOptions({
  status: 400,
  body: `{
    "Parse": ${ErrorsParser.ParseGinValidator},
    "Err": ${JSON.stringify(validatorV9FieldErrors)}
  }`,
}));

const govalidatorV4Error = <IGovalidatorV4Error>{
  Name: 'EmailAddress',
  Err: 'email_address does not validate as email',
};
const govalidatorErrorV4 = new Response(new ResponseOptions({
  status: 400,
  body: `{
    "Parse": ${ErrorsParser.ParseGovalidator},
    "Err": ${JSON.stringify(govalidatorV4Error)}
  }`,
}));

const govalidatorErrorV4String = new Response(new ResponseOptions({
  status: 400,
  body: `{
    "Parse": ${ErrorsParser.ParseGovalidator},
    "Err": "email_address does not validate as email"
  }`,
}));

const unparsed = new Response(new ResponseOptions({
  status: 400,
  body: `{
    "Parse": 100,
    "Err": "email_address does not validate as email"
  }`,
}));

const errorStyles: FieldErrorsStyles = {
  showType: FieldType.NAMED,
  showName: true,
  groupClass: 'my-group',
  fieldNameClass: 'my-field',
  itemsClass: 'my-items',
  itemClass: 'mat-error',
};

@Component({
  selector: 'app-ef-error',
  templateUrl: './ef-error.component.html',
  styleUrls: ['./ef-error.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EfErrorComponent implements OnInit {

  errorStyles: FieldErrorsStyles; // TODO
  errors: FieldsErrors;

  formating = false;
  innerErr: any;

  constructor(
    private http: Http,
    private serverErrorFormatService: ServerErrorFormatService) { }

  ngOnInit() {
  }

  codedError() {
    this.doError(codedError);
  }

  codedErrorReport() {
    this.doError(codedErrorReport);
  }

  validatorErrorV9() {
    this.doError(validatorErrorV9, xlangEfErrorDemoId);
  }

  govalidatorErrorV4() {
    this.doError(govalidatorErrorV4, xlangEfErrorDemoId);
  }

  govalidatorErrorV4String() {
    this.doError(govalidatorErrorV4String, xlangEfErrorDemoId);
  }

  httpFailed() {
    this.http.get('//127.0.0.1:12345').subscribe(
      res => console.error('should not get response', res),
      err => {
        this.doError(err);
      },
    );
  }

  unparsed() {
    this.doError(unparsed);
  }

  toggleCustomStyles() {
    this.errorStyles = this.errorStyles ? null : errorStyles;
  }

  private doError(error: Response | FieldsErrors | any, fieldXlangId?: any) {
    this.formating = true;
    this.serverErrorFormatService.format(error).subscribe(
      errors => {
        this.formating = false;
        this.errors = errors;
      },
      err => {
        this.formating = false;
        this.innerErr = err;
        console.error(err);
      },
    );
  }

}
