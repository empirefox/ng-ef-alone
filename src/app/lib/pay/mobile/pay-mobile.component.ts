import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DecimalPipe, Location } from '@angular/common';
import { Response } from '@angular/http';
import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { ua } from '../../common';
import { FieldErrorsStyles, FieldsErrors, ServerErrorFormatService } from '../../error';
import { XlangJsonService } from '../../xlang';

import { PayUser, PayOrder, PayMethod, PayConfig } from '../models';
import { PayService, WxService } from '../services';

@Component({
  selector: 'ef-pay-mobile',
  templateUrl: './pay-mobile.component.html',
  styleUrls: ['./pay-mobile.component.css']
})
export class PayMobileComponent implements OnInit, OnDestroy {

  @Input() user: PayUser;
  @Input() order: PayOrder;
  @Input() enable: PayMethod;
  @Input() formXjsonId: string;

  @Output() close = new EventEmitter<any>();
  @Output() setPaykey = new EventEmitter<PayOrder>();
  @Output() paid = new EventEmitter<Response>();

  // TODO
  errors: FieldsErrors;
  errorStyles: FieldErrorsStyles;

  tplTr: any;

  Method = PayMethod;
  method = PayMethod.NONE; // TODO not none forever
  methods: Set<PayMethod>;
  hasServerError: boolean;
  key: string;
  keyControl: FormControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
  paying: boolean;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private decimalPipe: DecimalPipe,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private serverErrorFormatService: ServerErrorFormatService,
    private xlangJsonService: XlangJsonService,
    private config: PayConfig,
    private payService: PayService,
    private wxService: WxService) { }

  get accept() {
    return this.enable & this.order.accept;
  }

  get valid(): boolean | number {
    switch (this.method) {
      case PayMethod.wepay:
        return this.accept & PayMethod.wepay;
      case PayMethod.alipay:
        return this.accept & PayMethod.alipay;
      case PayMethod.cash:
        return this.accept & PayMethod.cash && this.enough(PayMethod.cash) && this.keyControl.valid;
      case PayMethod.points:
        return this.accept & PayMethod.points && this.enough(PayMethod.points) && this.keyControl.valid;
      default:
        return 0;
    }
  }

  get tr() { return this.tplTr[PayMethod[this.method]]; }

  get amount() {
    const decimal = this.tr.decimal;
    const amount = this.order.amount;
    return decimal ? this.decimalPipe.transform(amount, decimal) : amount;
  }

  ngOnInit() {
    this.xlangJsonService.load(this.config.tplXjsonId).takeUntil(this.ngUnsubscribe).subscribe(tplTr => {
      this.tplTr = tplTr;
      const methods = (<string[]>tplTr.methods).map<PayMethod>(m => PayMethod[m]).filter(m => m);
      this.methods = new Set(methods);
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  canThenTr(method: PayMethod) {
    return this.accept & method ? this.tplTr[PayMethod[method]] : 0;
  }

  onChoose(method: PayMethod) {
    this.method = this.banlanceOk(method) && method || this.method;
  }

  enough(method: PayMethod): boolean {
    return this.user[PayMethod[method]] >= this.order.amount;
  }

  showBanlance(method: PayMethod, tr: any) {
    return PayMethod.HAS_BANLANCE | method && tr.banlance;
  }

  banlanceOk(method: PayMethod) {
    const checkBanlance = PayMethod.HAS_BANLANCE | method;
    return checkBanlance ? checkBanlance && this.enough(method) : true;
  }

  methodClass(method: PayMethod) {
    return {
      'pay-method': true,
      selected: this.method === method,
      disabled: !this.banlanceOk(method),
    };
  }

  efSymbol(method: PayMethod) {
    return `ef-pay#ef-pay-${PayMethod[method]}`;
  }

  onDismiss() {
    this.close.next();
  }

  gotoSetPayKey() {
    this.setPaykey.next(this.order);
  }

  onPay() {
    if (this.valid && !this.paying) {
      this.hasServerError = false;
      this.paying = true;
      let pay: Observable<Response>;
      switch (this.method) {
        case PayMethod.wepay:
          pay = this.wxService.payInMobile(this.order.id);
          break;
        case PayMethod.cash:
          pay = this.payService.cash(this.order.id, this.key);
          break;
        case PayMethod.points:
          pay = this.payService.points(this.order.id, this.key);
          break;
        default:
          throw new Error('Pay on unexpected type.');
      }
      pay.catch(err => this.formatError(err)).subscribe(
        res => this.payOk(res),
        errs => this.payFailed(errs),
      );
    }
  }

  private formatError(err: Response | any) {
    return this.xlangJsonService.load(this.config.formXjsonId)
      .mergeMap(formTpl => Observable.throw(this.serverErrorFormatService.format(err, formTpl)))
      .take(1);
  }

  private payOk(res: Response) {
    this.hasServerError = false;
    this.paying = false;
    this.paid.next(res);
  }

  private payFailed(errors: FieldsErrors) {
    this.hasServerError = true;
    this.paying = false;
    this.errors = errors;
  }

}
