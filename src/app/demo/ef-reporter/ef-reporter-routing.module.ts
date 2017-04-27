import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DEMO_ROUTER_LINKS } from '../core';
import { EfReporterComponent } from './ef-reporter.component';

const routes: Routes = [
  { path: DEMO_ROUTER_LINKS.reporter, component: EfReporterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EfReporterRoutingModule { }
