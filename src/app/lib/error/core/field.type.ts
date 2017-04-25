export enum FieldType {
  X = 0,
  UNPARSED = 1 << 0,
  UNAMED = 1 << 1,
  NAMED = 1 << 2,

  UNEXPECTED = UNPARSED | UNAMED,
  ALL = UNEXPECTED | NAMED,
}
