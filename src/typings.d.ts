/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

interface Dict<T> {
  [key: string]: T;
  [key: number]: T;
  // [key: symbol]: T;
}
