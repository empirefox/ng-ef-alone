import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ef-svg4e',
  templateUrl: './ef-svg4e.component.html',
  styleUrls: ['./ef-svg4e.component.css']
})
export class EfSvg4eComponent implements OnInit {
  efSymbol = 'ef-pay#ef-pay-wepay';
  href = '/assets/ef-pay/ef-pay.svg#ef-pay-alipay';

  constructor() { }

  ngOnInit() {
  }

}
