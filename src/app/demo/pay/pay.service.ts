import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PayService {
  pay$ = new Subject<void>();

  constructor() { }

}
