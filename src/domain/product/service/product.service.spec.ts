import Product from '../entity/product';
import ProductService from './product.service';

describe('Product service unit tests', () => {
  it('should change the prices of all products', () => {
    const products = [
      new Product('1', 'product 1', 100),
      new Product('2', 'product 2', 200),
    ];

    ProductService.increasePrice(products, 100);

    expect(products[0].price).toBe(200);
    expect(products[1].price).toBe(400);
  });
});
