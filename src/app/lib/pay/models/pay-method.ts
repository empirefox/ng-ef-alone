export enum PayMethod {
  NONE = 0,

  wepay = 1,
  alipay = 1 << 1,
  cash = 1 << 2,
  points = 1 << 3,

  MONEY = wepay | alipay | cash,
  WEPAY_CASH = wepay | cash,
  ALIPAY_CASH = alipay | cash,
  HAS_BANLANCE = cash | points,
  ALL = MONEY | points,
}
