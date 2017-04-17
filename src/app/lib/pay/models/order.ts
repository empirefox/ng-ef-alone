import { PayMethod } from './pay-method';

export interface PayOrder {
  id: number;
  amount: number;
  accept: PayMethod;
}
