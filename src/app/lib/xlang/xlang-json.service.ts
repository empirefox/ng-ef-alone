import { Inject, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import template from 'lodash-es/template';

import { RemoteErrorService } from '../reporter';
import { XLANG_JSON_CONFIGS } from './token';
import { XlangJsonConfig } from './xlang-json.config';
import { XlangService } from './xlang.service';

@Injectable()
export class XlangJsonService {
  private loaders = new Map<string, XlangJsonLoader>();

  constructor(
    http: Http,
    private remoteErrorService: RemoteErrorService,
    xlangService: XlangService,
    @Inject(XLANG_JSON_CONFIGS) configs: XlangJsonConfig[]) {
    configs.forEach(config => this.loaders.set(config.id, new XlangJsonLoader(http, xlangService, config, this.report.bind(this))));
  }

  load(id: string): Observable<any> {
    if (!this.loaders.has(id)) {
      throw new Error(`XlangJsonLoader for "${id}" not found`);
    }
    return this.loaders.get(id).load();
  }

  private report(err: any, caught: Observable<any>): Observable<any> {
    this.remoteErrorService.error(err);
    return caught;
  }

}

export class XlangJsonLoader {
  private url: ({ lang: string }) => string;
  private jsons = new Map<string, Observable<any>>();

  constructor(
    private http: Http,
    private xlangService: XlangService,
    private config: XlangJsonConfig,
    private report: (err: any, caught: Observable<any>) => Observable<any>) {
    this.url = template(this.config.urlTemplate);
  }

  load(): Observable<any> {
    return this.xlangService.lang$.mergeMap(lang0 => {
      if (!this.jsons.has(lang0)) {
        const lang = this.findLand([lang0, this.xlangService.defaultLang], this.config.langs);
        const json = this.http.get(this.url({ lang })).map(res => res.json()).catch(this.report).publishReplay(1).refCount();
        this.jsons.set(lang, json);
        this.jsons.set(lang0, json);
      }
      return this.jsons.get(lang0);
    });
  }

  findLand(langs: string[], all: string[]): string {
    for (let lang of langs) {
      if (~all.indexOf(lang)) {
        return lang;
      }
      lang = this.xlangService.langPart(lang);
      if (~all.indexOf(lang)) {
        return lang;
      }
    }
    return all[0];
  }

}
