import { Inject, NgModule, Optional, OpaqueToken, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { ReporterModule } from '../reporter';
import { SVG4E_BUNDLES } from './token';
import { Svg4eBundle, SVG4E_BUNDLE } from './svg4e.types';
import { Svg4eService } from './svg4e.service';
import { Svg4eDirective } from './svg4e.directive';

export const SVG4E_DEP = new OpaqueToken('Svg4eDep');

@NgModule({
  imports: [CommonModule, HttpModule, ReporterModule],
  declarations: [Svg4eDirective],
  exports: [HttpModule, ReporterModule, Svg4eDirective],
})
export class Svg4eModule {

  static forRoot(bundles?: Svg4eBundle[]): ModuleWithProviders {
    return {
      ngModule: Svg4eModule,
      providers: [
        Svg4eService,
        { provide: SVG4E_BUNDLES, useValue: bundles },
      ]
    };
  }

  constructor(
    @Inject(SVG4E_BUNDLES) bundles1: Svg4eBundle[],
    @Optional() @Inject(SVG4E_BUNDLE) bundles2: Svg4eBundle[],
    @Optional() @Inject(SVG4E_DEP) deps: string[]) {
    if (deps) {
      const bundles = [...(bundles1 || []), ...(bundles2 || [])];
      let names = bundles.map(bundle => [bundle.name, ...(bundle.alias || [])]).reduce((a, b) => [...a, ...b], []);
      const set = new Set(names);
      names = deps.filter(dep => !set.has(dep));
      if (names.length) {
        throw new Error(`Svg4eBundle for "${names}" must be added!`);
      }
    }
  }

}
