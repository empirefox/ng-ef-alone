import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DEMO_ROUTER_LINKS } from '../core';
import { EfErrorComponent } from './ef-error.component';

const routes: Routes = [
  { path: DEMO_ROUTER_LINKS.error, component: EfErrorComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EfErrorRoutingModule { }
