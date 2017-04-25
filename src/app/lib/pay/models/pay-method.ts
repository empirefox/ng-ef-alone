import { ua } from '../../common';

export interface PayMethodConfig {
  color: string;
  decimal?: string;
  divide?: number;
  banlance?: boolean;
  paykey?: boolean;
}

export enum PayMethod {
  NONE = 0,

  wepay = 1,
  alipay = 1 << 1,
  cash = 1 << 2,
  points = 1 << 3,

  MONEY = wepay | alipay | cash,
  WEPAY_CASH = wepay | cash,
  ALIPAY_CASH = alipay | cash,
  ALL = MONEY | points,
}

export const defaultPaySequence = [
  ua.isWeChat ? PayMethod.wepay : PayMethod.alipay,
  PayMethod.alipay,
  PayMethod.wepay,
  PayMethod.cash,
  PayMethod.points,
];

export const payMethodConfigs: { [index: number]: PayMethodConfig } = {
  [PayMethod.wepay]: {
    color: '#3CAF36',
    decimal: '1.2-2',
    divide: 100,
  },
  [PayMethod.alipay]: {
    color: '#009FE8',
    decimal: '1.2-2',
    divide: 100,
  },
  [PayMethod.cash]: {
    color: '#f44336',
    decimal: '1.2-2',
    divide: 100,
    banlance: true,
    paykey: true,
  },
  [PayMethod.points]: {
    color: '#38142D',
    banlance: true,
  },
};

export interface PayMethodTranslate {
  name: string;
  cc?: string;
  unit: string;
  banlance?: { all: string; failed: string; };
}
