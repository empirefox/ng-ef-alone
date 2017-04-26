import { InjectionToken } from '@angular/core';

export const SVG4E_BUNDLE = new InjectionToken<Svg4eBundle>('Svg4eBundle');

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
