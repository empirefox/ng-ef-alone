import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { Response } from '@angular/http';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { ua } from '../../common';
import { FieldErrorsStyles, FieldsErrors, ServerErrorFormatService } from '../../error';
import { XlangJsonService } from '../../xlang';

import {
  PayUser, PayOrder,
  PayConfig,
  PayMethod,
  PayMethodConfig, defaultPaySequence, payMethodConfigs, PayMethodTranslate,
} from '../models';
import { PayService, WxService } from '../services';

interface ViewPayItem {
  method: PayMethod;
  config: PayMethodConfig;
  color: string;
  tr: PayMethodTranslate;
  efSymbol: string;
  amount: string | number;
  banlance: string;
  banlanceOk: boolean;
  showPaykey: boolean;
  gotoPaykeyLabel: string;
  valid: boolean;
}

@Component({
  selector: 'ef-pay-mobile',
  templateUrl: './pay-mobile.component.html',
  styleUrls: ['./pay-mobile.component.scss']
})
export class PayMobileComponent implements OnInit, OnDestroy {

  @Input() user: PayUser;
  @Input() order: PayOrder;
  @Input() enable: PayMethod;

  @Output() close = new EventEmitter<any>();
  @Output() setPaykey = new EventEmitter<PayOrder>();
  @Output() paid = new EventEmitter<Response>();

  tplTr: any;
  now: ViewPayItem; // TODO not none forever
  items: ViewPayItem[];

  key: string;
  keyControl: FormControl;

  paying: boolean;
  hasServerError: boolean;
  errorStyles: FieldErrorsStyles; // TODO
  errors: FieldsErrors;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private currencyPipe: CurrencyPipe,
    private decimalPipe: DecimalPipe,
    private serverErrorFormatService: ServerErrorFormatService,
    private xlangJsonService: XlangJsonService,
    private config: PayConfig,
    private payService: PayService,
    private wxService: WxService) { }

  get valid(): boolean | number {
    const keyValid = !this.now.config.paykey || this.keyControl.valid;
    return keyValid && this.now.valid;
  }

  ngOnInit() {
    this.keyControl = new FormControl('', [Validators.required, Validators.pattern(this.config.paykeyPattern)]);

    this.xlangJsonService.load(this.config.tplXjsonId).takeUntil(this.ngUnsubscribe).subscribe(tplTr => {
      this.items = (<string[]>tplTr.methods).map<ViewPayItem>(m => {
        const method: PayMethod = PayMethod[m];
        const accepted = this.enable & this.order.accept & method;
        if (method && accepted) {
          const config = payMethodConfigs[method];
          const tr: PayMethodTranslate = tplTr[m];
          const { cc, unit } = tr;

          const { decimal, color, paykey, divide = 1 } = config;
          const amount = this.order.amount / divide;

          let banlance: string;
          if (config.banlance) {
            const { all = '', failed = '' } = config.banlance && tr.banlance || {};
            const bn: number = (this.user[m] || 0) / divide;
            const bv = cc ? this.currencyPipe.transform(bn, cc, true, decimal) :
              `${(decimal ? this.decimalPipe.transform(bn, decimal) : bn)} ${unit}`;
            banlance = `${all}${bv}${failed}`;
          }

          const banlanceOk = !config.banlance || this.user[m] >= amount;
          return {
            method, config, tr,
            color: color,
            efSymbol: `ef-pay#ef-pay-${m}`,
            amount: cc ? this.currencyPipe.transform(amount, cc, false, decimal) :
              `${(decimal ? this.decimalPipe.transform(amount, decimal) : amount)} ${unit}`,
            banlance,
            banlanceOk,
            showPaykey: paykey && this.user.hasPayKey,
            gotoPaykeyLabel: paykey && !this.user.hasPayKey && tplTr.gotoPaykeyLabel,
            valid: accepted && banlanceOk,
          };
        }
      }).filter(m => m);
      this.now = this.now || this.defaultMethod();
      this.tplTr = tplTr;
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  methodClass(item: ViewPayItem) {
    return {
      active: this.now === item,
      disabled: !item.banlanceOk,
    };
  }

  checkBtnColor(item: ViewPayItem) {
    return this.now === item ? 'warn' : null;
  }

  onChoose(item: ViewPayItem) {
    this.now = item.banlanceOk && item || this.now;
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
      const method = this.now.method;
      switch (method) {
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
      pay.do(_ => this.user.last = method).catch(err => this.formatError(err)).subscribe(
        (res: any) => this.payOk(res),
        errs => this.payFailed(errs),
      );
    }
  }

  private defaultMethod(): ViewPayItem {
    let view: ViewPayItem;
    [this.user.last || this.config.recommend || defaultPaySequence[0], ...defaultPaySequence]
      .findIndex(method => ~this.items.findIndex(item => (view = item).method === method) as any);
    return view;
  }

  private formatError(err: Response | any) {
    return this.xlangJsonService.load(this.config.formXjsonId)
      .mergeMap(formTpl => this.serverErrorFormatService.throw(err, formTpl));
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
