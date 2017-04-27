import { NgModule } from '@angular/core';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MdButtonModule,
  MdCardModule,
  MdListModule,
  MdIconModule,
  MdInputModule,
  MdProgressSpinnerModule,
  MdSidenavModule,
  MdToolbarModule,
} from '@angular/material';

import { AUTH_HTTP } from './lib/common';
import { ReporterModule, CONSOLE_ERROR_REPORTER_PROVIDER, REMOTE_NG_ERROR_HANDLER } from './lib/reporter';
import { ShowJSErrorModule } from './lib/reporter/show';
import { XlangModule } from './lib/xlang';
import { Svg4eModule } from './lib/svg4e';
import { ErrorModule } from './lib/error';
import { PayModule } from './lib/pay';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DemoModule, xlangConfigs, svg4eBundles, errorConfig, payConfigFactory } from './demo';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MdButtonModule.forRoot(),
    MdCardModule.forRoot(),
    MdListModule.forRoot(),
    MdIconModule.forRoot(),
    MdInputModule.forRoot(),
    MdProgressSpinnerModule.forRoot(),
    MdSidenavModule.forRoot(),
    MdToolbarModule.forRoot(),
    AppRoutingModule,

    DemoModule.forRoot(),

    ReporterModule.forRoot(),
    ShowJSErrorModule.forRoot(),
    XlangModule.forRoot(xlangConfigs, 'zh'),
    Svg4eModule.forRoot(svg4eBundles),
    ErrorModule.forRoot(errorConfig),
    PayModule.forRoot(payConfigFactory),
  ],
  providers: [
    CurrencyPipe, DecimalPipe,
    REMOTE_NG_ERROR_HANDLER,
    CONSOLE_ERROR_REPORTER_PROVIDER,
    { provide: AUTH_HTTP, useExisting: Http },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
