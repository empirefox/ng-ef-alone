import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { PayOrder } from '../../lib/pay';

@Injectable()
export class PayService {
  pay$ = new Subject<PayOrder>();

  constructor() { }

}
