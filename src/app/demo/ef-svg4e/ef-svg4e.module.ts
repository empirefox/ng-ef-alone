import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdButtonModule, MdIconModule } from '@angular/material';

import { Svg4eModule, Svg4eBundle } from '../../lib/svg4e';
import { EfSvg4eRoutingModule } from './ef-svg4e-routing.module';
import { EfSvg4eComponent } from './ef-svg4e.component';

@NgModule({
  imports: [
    CommonModule,
    MdButtonModule,
    MdIconModule,
    Svg4eModule,
    EfSvg4eRoutingModule
  ],
  declarations: [EfSvg4eComponent]
})
export class EfSvg4eModule { }

export const svg4eBundles: Svg4eBundle[] = [
  {
    name: 'ef-pay',
    url: '/assets/ef-pay/ef-pay.svg',
    class: '',
  },
];
