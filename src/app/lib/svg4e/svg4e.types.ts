export class Svg4eBundle {
  name: string;
  alias?: string[];
  url: string;
  class?: string;
}

export interface ISvg4eSymbol {
  viewBox: string;
  fragment: DocumentFragment;
  bundle: Svg4eBundle;
}
