import { Component, OnInit } from '@angular/core';

import { XlangService, XlangJsonService } from '../../lib/xlang';
import { xlangCodesId } from '../core';

@Component({
  selector: 'app-ef-xlang',
  templateUrl: './ef-xlang.component.html',
  styleUrls: ['./ef-xlang.component.css']
})
export class EfXlangComponent implements OnInit {

  langs = {
    zh: 'en',
    en: 'zh',
  };
  lang = 'en';

  codes: any;
  private sub: any;

  constructor(
    private xlangService: XlangService,
    private xlangJsonService: XlangJsonService) { }

  ngOnInit() {
    this.sub = this.xlangJsonService.load(xlangCodesId).subscribe(result => this.codes = result.json);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  changeLang() {
    this.xlangService.use(this.lang = this.langs[this.lang]);
  }

}
