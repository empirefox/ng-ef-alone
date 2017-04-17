import { Headers, RequestMethod, RequestOptionsArgs, Response, ResponseContentType } from '@angular/http';

export class LogerrConfig implements RequestOptionsArgs {
  url: string;
  method?: RequestMethod.Get | RequestMethod.Post;
  params?: string | URLSearchParams | { [key: string]: any | any[] };
  headers?: Headers;
  body?: any;
  withCredentials?: boolean;
  responseType?: ResponseContentType;

  messageKey: string;
  globalErrors?: boolean;
  successCallback?: (res: Response) => any;
  errorCallback?: (err: Response) => any;
}
