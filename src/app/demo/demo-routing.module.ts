import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuyComponent } from './buy/buy.component';

const routes: Routes = [
  { path: 'buy', component: BuyComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoRoutingModule { }
