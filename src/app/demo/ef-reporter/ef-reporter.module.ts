import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdButtonModule } from '@angular/material';

import { ReporterModule } from '../../lib/reporter';
import { EfReporterRoutingModule } from './ef-reporter-routing.module';
import { EfReporterComponent } from './ef-reporter.component';

@NgModule({
  imports: [
    CommonModule,
    MdButtonModule,
    ReporterModule,
    EfReporterRoutingModule
  ],
  declarations: [EfReporterComponent]
})
export class EfReporterModule { }
