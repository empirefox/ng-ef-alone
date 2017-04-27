import { Component, OnInit } from '@angular/core';

import { PayOrder, PayMethod } from '../../lib/pay';
import { PayService } from '../services/pay.service';

@Component({
  selector: 'app-ef-pay',
  templateUrl: './ef-pay.component.html',
  styleUrls: ['./ef-pay.component.css']
})
export class EfPayComponent implements OnInit {

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
