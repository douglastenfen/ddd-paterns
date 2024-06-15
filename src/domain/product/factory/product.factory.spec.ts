import ProductFactory from './product.factory';

describe('Product factory unit tests', () => {
  it('should create a product type A', () => {
    const product = ProductFactory.create('a', 'product a', 10);

    expect(product.id).toBeDefined();
    expect(product.name).toBe('product a');
    expect(product.price).toBe(10);
    expect(product.constructor.name).toBe('Product');
  });

  it('should create a product type B', () => {
    const product = ProductFactory.create('b', 'product b', 10);

    expect(product.id).toBeDefined();
    expect(product.name).toBe('product b');
    expect(product.price).toBe(20);
    expect(product.constructor.name).toBe('ProductB');
  });

  it('should throw an error when creating an invalid product type', () => {
    expect(() => ProductFactory.create('c', 'product c', 10)).toThrow(
      'Invalid product type'
    );
  });
});
