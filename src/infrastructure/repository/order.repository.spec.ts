import { Sequelize } from 'sequelize-typescript';
import Order from '../../domain/checkout/entity/order';
import OrderItem from '../../domain/checkout/entity/order_item';
import Customer from '../../domain/customer/entity/customer';
import Address from '../../domain/customer/value-object/address';
import Product from '../../domain/product/entity/product';
import CustomerModel from '../db/sequelize/model/customer.model';
import OrderItemModel from '../db/sequelize/model/order-item.model';
import OrderModel from '../db/sequelize/model/order.model';
import ProductModel from '../db/sequelize/model/product.model';
import CustomerRepository from './customer.repository';
import OrderRepository from './order.repository';
import ProductRepository from './product.repository';

describe('Order repository test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([
      CustomerModel,
      OrderItemModel,
      OrderModel,
      ProductModel,
    ]);

    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a new order', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('1', 'John Doe');
    const address = new Address('street test', 123, '12345-123', 'city test');

    customer.changeAddress(address);

    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product('1', 'Product test', 100);

    await productRepository.create(product);

    const orderItem = new OrderItem(
      '1',
      product.id,
      product.name,
      product.price,
      2
    );

    const order = new Order('1', customer.id, [orderItem]);

    const orderRepository = new OrderRepository();

    await orderRepository.create(order);

    const orderCreated = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items'],
    });

    expect(orderCreated.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: customer.id,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: product.price,
          product_id: product.id,
          quantity: orderItem.quantity,
          order_id: order.id,
        },
      ],
    });
  });

  it('should update an order', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('1', 'John Doe');
    const address = new Address('street test', 123, '12345-123', 'city test');

    customer.changeAddress(address);

    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product('1', 'Product test', 100);

    await productRepository.create(product);

    const orderItem = new OrderItem(
      '1',
      product.id,
      product.name,
      product.price,
      2
    );

    const order = new Order('1', customer.id, [orderItem]);

    const orderRepository = new OrderRepository();

    await orderRepository.create(order);

    await orderRepository.update(order);

    const orderUpdated = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items'],
    });

    expect(orderUpdated.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: customer.id,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: product.price,
          product_id: product.id,
          quantity: orderItem.quantity,
          order_id: order.id,
        },
      ],
    });
  });

  it('should find an order by id', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('1', 'John Doe');
    const address = new Address('street test', 123, '12345-123', 'city test');

    customer.changeAddress(address);

    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product('1', 'Product test', 100);

    await productRepository.create(product);

    const orderItem = new OrderItem(
      '1',
      product.id,
      product.name,
      product.price,
      2
    );

    const order = new Order('1', customer.id, [orderItem]);

    const orderRepository = new OrderRepository();

    await orderRepository.create(order);

    const orderFound = await orderRepository.findById(order.id);

    expect(orderFound).toStrictEqual(order);
  });

  it('should find all orders', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('1', 'John Doe');
    const address = new Address('street test', 123, '12345-123', 'city test');

    customer.changeAddress(address);

    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product('1', 'Product test', 100);

    await productRepository.create(product);

    const orderItem = new OrderItem(
      '1',
      product.id,
      product.name,
      product.price,
      2
    );

    const order = new Order('1', customer.id, [orderItem]);

    const orderRepository = new OrderRepository();

    await orderRepository.create(order);

    const orderItem2 = new OrderItem(
      '2',
      product.id,
      product.name,
      product.price,
      2
    );

    const order2 = new Order('2', customer.id, [orderItem2]);

    await orderRepository.create(order2);

    const orders = await orderRepository.findAll();

    expect(orders).toStrictEqual([order, order2]);
  });
});
