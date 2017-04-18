import { PayMethod } from './pay-method';

export interface PayUser {
  hasPayKey: boolean;
  cash: number;
  points: number;
  last?: PayMethod;
}
