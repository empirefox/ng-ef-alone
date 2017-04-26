import { NgEfSandPage } from './app.po';

describe('ng-ef-sand App', () => {
  let page: NgEfSandPage;

  beforeEach(() => {
    page = new NgEfSandPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
