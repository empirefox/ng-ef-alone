import { Component, OnInit } from '@angular/core';

import { RemoteErrorService } from '../../lib/reporter';

@Component({
  selector: 'app-ef-reporter',
  templateUrl: './ef-reporter.component.html',
  styleUrls: ['./ef-reporter.component.css']
})
export class EfReporterComponent implements OnInit {

  constructor(private remoteErrorService: RemoteErrorService) { }

  ngOnInit() {
  }

  throw() {
    throw new Error('Direct throw');
  }

  report() {
    this.remoteErrorService.error(new Error('Call service'));
  }

}
