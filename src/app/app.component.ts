import { Component, ViewChild } from '@angular/core';
import { Response } from '@angular/http';
import { MdSidenav } from '@angular/material';

import { PayUser, PayOrder, PayMethod } from './lib/pay';
import { PayService } from './demo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(MdSidenav) paySidenav: MdSidenav;

  title = 'app works!';
  user: PayUser = {
    hasPayKey: true,
    cash: 10000,
    points: 500000,
  };
  order: PayOrder = {
    id: 100,
    desc: 'phone',
    amount: 10000,
    accept: PayMethod.ALL,
  };
  enable = PayMethod.WEPAY_CASH;

  private sub: any;

  constructor(private payService: PayService) { }

  ngOnInit() {
    this.payService.pay$.subscribe(_ => this.paySidenav.open());
  }

  ngOnDestroy() {
    this.sub.subscribe();
  }

  onSetPaykey(order: PayOrder) {
    console.log(order);
  }

  onClose() {
    this.paySidenav.close();
  }

  onPaid(res: Response) {
    this.paySidenav.close();
    console.log(res.json());
  }

}
