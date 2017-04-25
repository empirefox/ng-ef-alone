import { Component, OnInit } from '@angular/core';

import { PayService } from '../pay/pay.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {

  constructor(private payService: PayService) { }

  ngOnInit() {
  }

  onPay() {
    this.payService.pay$.next();
  }

}
