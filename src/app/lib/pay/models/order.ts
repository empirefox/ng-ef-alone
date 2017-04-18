import { PayMethod } from './pay-method';

export interface PayOrder {
  id: number;
  desc?: string;
  amount: number;
  accept: PayMethod;
}
