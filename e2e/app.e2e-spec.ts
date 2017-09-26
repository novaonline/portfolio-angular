import { PortfolioAppPage } from './app.po';

describe('portfolio-app App', () => {
  let page: PortfolioAppPage;

  beforeEach(() => {
    page = new PortfolioAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
