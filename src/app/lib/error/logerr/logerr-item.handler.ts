import { Http, Request, RequestOptions, RequestOptionsArgs, RequestMethod, URLSearchParams } from '@angular/http';

import { toURLSearchParams } from '../../common';
import { RemoteErrorHandler } from '../errors';
import { LogerrConfig } from './logerr.config';

export class LogerrItemHandler implements RemoteErrorHandler {
  private options: RequestOptions;
  private params: URLSearchParams;
  private body: any;

  constructor(
    private http: Http,
    private config: LogerrConfig) {
    this.init();
  }

  private onerror = (err: any) => {
    let options: RequestOptionsArgs;
    if (this.options.method === RequestMethod.Get) {
      const params = this.params.clone();
      params.appendAll(toURLSearchParams(err));
      options = { params };
    } else {
      const body = Object.assign({}, this.body, err);
      options = { body };
    }
    this.http.request(new Request(this.options.merge(options))).subscribe(
      this.config.successCallback,
      this.config.errorCallback,
    );
  }

  init() {
    this.options = new RequestOptions(Object.assign({ method: RequestMethod.Get }, this.config));
    this.params = this.options.params;
    this.body = this.options.body;
    if (this.config.globalErrors) {
      window.removeEventListener('error', this.onerror);
      window.addEventListener('error', this.onerror);
    }
  }

  log(message: any) {
    message = typeof message === 'object' ? message : { [this.config.messageKey]: message };
    this.onerror(message);
  }

  error(error: Error) {
    this.onerror(error);
  }

}
