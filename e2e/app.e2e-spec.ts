import { ProductsPage } from './products.po';

describe('products page', () => {
  let page: ProductsPage;

  beforeEach(() => {
    page = new ProductsPage();
  });

  it('should have the right page title', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Products');
  });
});
