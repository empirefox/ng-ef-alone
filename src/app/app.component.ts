import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { Response } from '@angular/http';
import { MdSidenav } from '@angular/material';

import { PayUser, PayOrder, PayMethod } from './lib/pay';
import { PayService, DEMO_ROUTER_LINKS } from './demo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  @ViewChild(MdSidenav) paySidenav: MdSidenav;

  title = 'app works!';
  user: PayUser = {
    hasPayKey: true,
    cash: 10000,
    points: 500000,
  };
  order: PayOrder;
  enable = PayMethod.WEPAY_CASH;

  navItems = Object.keys(DEMO_ROUTER_LINKS);

  private sub: any;

  constructor(private payService: PayService) { }

  ngOnInit() {
    this.payService.pay$.subscribe(order => {
      // TODO validate order
      this.order = order;
      this.paySidenav.open();
    });
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
