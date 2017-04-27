import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EfHomeRoutingModule } from './ef-home-routing.module';
import { EfHomeComponent } from './ef-home.component';

@NgModule({
  imports: [
    CommonModule,
    EfHomeRoutingModule
  ],
  declarations: [EfHomeComponent]
})
export class EfHomeModule { }
