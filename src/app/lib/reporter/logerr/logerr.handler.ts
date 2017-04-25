import { Inject, Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { RemoteErrorHandler } from '../core';
import { LogerrConfig } from './logerr.config';
import { LogerrItemHandler } from './logerr-item.handler';

@Injectable()
export class LogerrHandler extends RemoteErrorHandler {
  private items: LogerrItemHandler[];

  constructor(
    private http: Http,
    @Inject(LogerrConfig) private configs: LogerrConfig[]) {
    super();
    this.init();
  }

  init() {
    this.items = this.configs.map(config => new LogerrItemHandler(this.http, config));
    this.items.forEach(items => items.init());
  }

  log(message: any) {
    this.items.forEach(items => items.log(message));
  }

  error(error: Error) {
    this.items.forEach(items => items.error(error));
  }

}
