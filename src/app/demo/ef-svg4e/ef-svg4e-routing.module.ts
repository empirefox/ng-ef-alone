import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DEMO_ROUTER_LINKS } from '../core';
import { EfSvg4eComponent } from './ef-svg4e.component';

const routes: Routes = [
  { path: DEMO_ROUTER_LINKS.svg4e, component: EfSvg4eComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EfSvg4eRoutingModule { }
