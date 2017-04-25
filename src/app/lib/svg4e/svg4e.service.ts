// https://github.com/jonathantneal/svg4everybody
import { Inject, Injectable, Optional } from '@angular/core';
import { Http, Response } from '@angular/http';
import { DOCUMENT } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

import { RemoteErrorService } from '../reporter';
import { SVG4E_BUNDLES } from './token';
import { Svg4eBundle, SVG4E_BUNDLE, ISvg4eSymbol } from './svg4e.types';

@Injectable()
export class Svg4eService {
  private caches = new Map<string, Observable<Map<string, ISvg4eSymbol>>>();
  private merged: Observable<Map<string, ISvg4eSymbol>>;
  private bundlesByName = new Map<string, Svg4eBundle>();
  private document: Document;

  constructor(
    @Inject(DOCUMENT) document: any,
    private http: Http,
    private remoteErrorService: RemoteErrorService,
    @Optional() @Inject(SVG4E_BUNDLES) private bundles1: Svg4eBundle[],
    @Optional() @Inject(SVG4E_BUNDLE) private bundles2: Svg4eBundle[]) {
    this.document = document;
    this.init();
  }

  getSymbol(id: string, bundle?: string): Observable<ISvg4eSymbol> {
    if (bundle) {
      return this.caches.has(bundle) ? this.caches.get(bundle).map(svg4eSymbol => svg4eSymbol.get(id)) : Observable.of(null);
    }
    return this.merged.first(svg4eSymbol => svg4eSymbol.has(id), svg4eSymbol => svg4eSymbol.get(id));
  }

  getBundle(bundle): Svg4eBundle {
    return this.bundlesByName.get(bundle);
  }

  private init() {
    const caches = this.caches;
    const bundles = [...(this.bundles1 || []), ...(this.bundles2 || [])];

    const all = bundles.map(bundle => {
      this.bundlesByName.set(bundle.name, bundle);
      const cache = this.http.get(bundle.url).map(res => {
        const cachedDocument = this.document.implementation.createHTMLDocument('');
        cachedDocument.body.innerHTML = res.text();
        const symbolById = new Map<string, ISvg4eSymbol>();
        const symbols: HTMLElement[] = Array.apply(null, cachedDocument.querySelectorAll('symbol,svg'));
        symbols.forEach(symbol => {
          if (symbol.id) {
            const fragment = this.document.createDocumentFragment();
            const viewBox = symbol.getAttribute('viewBox');

            const clone = symbol.cloneNode(true);
            while (clone.childNodes.length) {
              fragment.appendChild(clone.firstChild);
            }

            symbolById.set(symbol.id, { viewBox, fragment, bundle });
          }
        });
        return symbolById;
      }).catch(this.report.bind(this)).publishReplay(1).refCount();

      const name = bundle.name;
      if (caches.has(name)) {
        this.report(new Error(`svg4e bundle name(${name}) has already exist. Ignore it!`));
      } else {
        caches.set(name, cache);
      }
      return cache;
    });

    this.merged = Observable.merge(...all);

    bundles.forEach(bundle => {
      (bundle.alias || []).forEach(name => {
        if (caches.has(name)) {
          this.report(new Error(`svg4e bundle alias(${name}) has already exist. Ignore it!`));
        } else {
          caches.set(name, caches.get(bundle.name));
        }
      });
    });
  }

  private report(err: any, caught?: Observable<any>): Observable<any> {
    this.remoteErrorService.error(err);
    return caught;
  }

}

