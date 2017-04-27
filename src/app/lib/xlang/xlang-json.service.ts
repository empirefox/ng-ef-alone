import { Inject, Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import template from 'lodash-es/template';

import { responseToError } from '../common';
import { RemoteErrorService } from '../reporter';
import { XlangJsonConfig, XlangResult } from './types';
import { XLANG_JSON_CONFIGS } from './token';
import { XlangService } from './xlang.service';

@Injectable()
export class XlangJsonService {
  private loaders = new Map<string, XlangJsonLoader>();

  constructor(
    http: Http,
    private remoteErrorService: RemoteErrorService,
    private xlangService: XlangService,
    @Inject(XLANG_JSON_CONFIGS) configs: XlangJsonConfig[]) {
    configs.forEach(config => this.loaders.set(config.id, new XlangJsonLoader(http, xlangService, config, remoteErrorService)));
  }

  load(id: any, lang?: string): Observable<XlangResult> {
    if (!this.loaders.has(id)) {
      throw new Error(`XlangJsonLoader for "${id}" not found`);
    }
    if (lang) {
      return this.loaders.get(id).load(lang);
    }
    return this.xlangService.lang$.mergeMap(lang0 => {
      return this.loaders.get(id).load(lang0);
    });
  }

  takeAll(ids: Dict<any>, lang?: string): Observable<Dict<any>> {
    if (!ids) {
      return Observable.of({});
    }
    const keys = Object.keys(ids);
    if (!keys.length) {
      return Observable.of({});
    }

    if (lang) {
      return this.getAll(ids, keys, lang);
    }
    return this.xlangService.lang$.mergeMap(lang0 => this.getAll(ids, keys, lang0));
  }

  private getAll(ids: Dict<any>, keys: string[], lang0: string): Observable<Dict<any>> {
    const xvalues = keys.map(key => {
      const id = ids[key];
      if (!this.loaders.has(id)) {
        throw new Error(`XlangJsonLoader for "${id}" not found`);
      }
      return this.loaders.get(id).load(lang0).take(1);
    });
    return Observable.forkJoin(...xvalues).map(values => {
      const jsons: Dict<any> = {};
      keys.forEach((key, i) => jsons[key] = values[i].json);
      return jsons;
    });
  }

}

export class XlangJsonLoader {
  private url: ({ lang: string }) => string;
  private jsons = new Map<string, Observable<XlangResult>>();

  constructor(
    private http: Http,
    private xlangService: XlangService,
    private config: XlangJsonConfig,
    private remoteErrorService: RemoteErrorService) {
    this.url = template(this.config.urlTemplate);
  }

  load(lang0: string): Observable<XlangResult> {
    if (!this.jsons.has(lang0)) {
      const lang = this.findLand([lang0, this.xlangService.defaultLang], this.config.langs);
      const json = this.http.get(this.url({ lang }))
        .map(res => ({ lang, json: res.json() }))
        .catch((err: any, caught: Observable<any>) => {
          this.remoteErrorService.error(responseToError(err));
          // return undefined to prevent endless request loop.
          return Observable.of();
        }).publishReplay(1).refCount();
      this.jsons.set(lang, json);
      this.jsons.set(lang0, json);
    }
    return this.jsons.get(lang0);
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
