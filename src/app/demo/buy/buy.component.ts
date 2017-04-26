import { Component, OnInit } from '@angular/core';

import { PayOrder, PayMethod } from '../../lib/pay';
import { PayService } from '../pay/pay.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {

  order: PayOrder = {
    id: 100,
    desc: 'phone',
    amount: 10000,
    accept: PayMethod.ALL,
  };

  constructor(private payService: PayService) { }

  ngOnInit() {
  }

  onPay() {
    this.payService.pay$.next(this.order);
  }

}
