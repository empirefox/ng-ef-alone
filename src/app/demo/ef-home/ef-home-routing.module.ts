import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EfHomeComponent } from './ef-home.component';

const routes: Routes = [
  { path: 'home', component: EfHomeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EfHomeRoutingModule { }
