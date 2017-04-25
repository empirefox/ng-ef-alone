import { OpaqueToken } from '@angular/core';

export const SVG4E_BUNDLE = new OpaqueToken('Svg4eBundle');

export interface Svg4eBundle {
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
