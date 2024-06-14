import Product from './product';

describe('Product unit tests', () => {
  it('should throw error when ID is empty', () => {
    expect(() => new Product('', 'product', 100)).toThrow('ID is required');
  });

  it('should throw error when name is empty', () => {
    expect(() => new Product('1', '', 100)).toThrow('Name is required');
  });

  it('should throw error when price is less than zero', () => {
    expect(() => new Product('1', 'product', -1)).toThrow(
      'Price must be greater than zero'
    );
  });

  it('should change name', () => {
    const product = new Product('1', 'product', 100);

    product.changeName('new product');

    expect(product.name).toBe('new product');
  });

  it('should change price', () => {
    const product = new Product('1', 'product', 100);

    product.changePrice(200);

    expect(product.price).toBe(200);
  });
});
