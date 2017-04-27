import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DEMO_ROUTER_LINKS } from '../core';
import { EfPayComponent } from './ef-pay.component';

const routes: Routes = [
  { path: DEMO_ROUTER_LINKS.pay, component: EfPayComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EfPayRoutingModule { }
