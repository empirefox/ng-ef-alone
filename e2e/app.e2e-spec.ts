import { NgEfAlonePage } from './app.po';

describe('ng-ef-alone App', () => {
  let page: NgEfAlonePage;

  beforeEach(() => {
    page = new NgEfAlonePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
