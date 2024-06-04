import { Sequelize } from 'sequelize-typescript';
import Product from '../../domain/entity/product';
import ProductModel from '../db/sequelize/model/product.model';
import ProductRepository from './product.repository';

describe('Product repository test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);

    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a product', async () => {
    const productRepository = new ProductRepository();
    const product = new Product('1', 'product test', 1000);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: '1' } });

    expect(productModel.toJSON()).toStrictEqual({
      id: '1',
      name: 'product test',
      price: 1000,
    });
  });

  it('should update a product', async () => {
    const productRepository = new ProductRepository();
    const product = new Product('1', 'product test', 1000);

    await productRepository.create(product);

    product.changeName('product test updated');
    product.changePrice(2000);

    await productRepository.update(product);

    const productModel = await ProductModel.findOne({ where: { id: '1' } });

    expect(productModel.toJSON()).toStrictEqual({
      id: '1',
      name: 'product test updated',
      price: 2000,
    });
  });

  it('should find a product by id', async () => {
    const productRepository = new ProductRepository();
    const product = new Product('1', 'product test', 1000);

    await productRepository.create(product);

    const productFound = await productRepository.findById('1');

    expect(productFound).toStrictEqual(product);
  });

  it('should find all products', async () => {
    const productRepository = new ProductRepository();
    const product1 = new Product('1', 'product test 1', 1000);
    const product2 = new Product('2', 'product test 2', 2000);

    await productRepository.create(product1);
    await productRepository.create(product2);

    const products = await productRepository.findAll();

    expect(products).toStrictEqual([product1, product2]);
  });
});
