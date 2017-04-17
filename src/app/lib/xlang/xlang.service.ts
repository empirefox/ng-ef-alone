import { Inject, Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import LngDetector from 'i18next-browser-languagedetector';

import { DEFAULT_XLANG } from './token';

@Injectable()
export class XlangService {
  public lang$: ReplaySubject<string> = new ReplaySubject<string>(1);

  private lngDetector: any;

  constructor( @Inject(DEFAULT_XLANG) public defaultLang: string) {
    this.lngDetector = new LngDetector({
      languageUtils: {
        formatLanguageCode: x => x,
        isWhitelisted: _ => 1
      }
    }, {
        fallbackLng: [defaultLang]
      });
    this.use(this.detect());
  }

  use(lang: string) {
    this.lngDetector.cacheUserLanguage(lang);
    this.lang$.next(lang);
  }

  langPart(lang: string): string {
    return lang.split('-')[0];
  }

  detect(): string {
    return this.lngDetector.detect();
  }

}
