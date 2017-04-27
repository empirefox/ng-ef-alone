import { Response, URLSearchParams } from '@angular/http';

export function toURLSearchParams(obj): URLSearchParams {
  const params = new URLSearchParams();
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      params.set(key, obj[key]);
    }
  }
  return params;
}

export function responseToError(error: any): Error {
  let errMsg: string;
  if (error instanceof Response) {
    let err;
    try {
      const body = error.json() || '';
      err = body.error || JSON.stringify(body);
    } catch (_) {
      err = error.text();
    }
    errMsg = `${error.status || 'ERR_CONNECTION_REFUSED'} - ${error.statusText || ''} ${err}`;
  } else {
    errMsg = error.message ? error.message : error.toString();
  }
  return new Error(errMsg);
}

export const isHttps = window.location.protocol === 'https:';
