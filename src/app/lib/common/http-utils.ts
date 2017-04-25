import { URLSearchParams } from '@angular/http';

export function toURLSearchParams(obj): URLSearchParams {
  const params = new URLSearchParams();
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      params.set(key, obj[key]);
    }
  }
  return params;
}

export const isHttps = window.location.protocol === 'https:';
