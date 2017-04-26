import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { IHttp } from './http';

export const AUTH_HTTP = new InjectionToken<IHttp>('AuthHttp');

@Injectable()
export class AuthHttpService {
  constructor( @Optional() @Inject(AUTH_HTTP) public http: IHttp) { }
}
