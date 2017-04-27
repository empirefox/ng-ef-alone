import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DEMO_ROUTER_LINKS } from '../core';
import { EfXlangComponent } from './ef-xlang.component';

const routes: Routes = [
  { path: DEMO_ROUTER_LINKS.xlang, component: EfXlangComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EfXlangRoutingModule { }
