import { Sequelize } from 'sequelize-typescript';
import Customer from '../../domain/customer/entity/customer';
import Address from '../../domain/customer/value-object/address';
import CustomerModel from '../db/sequelize/model/customer.model';
import CustomerRepository from './customer.repository';

describe('Customer repository test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel]);

    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a customer', async () => {
    const customerRepository = new CustomerRepository();

    const customer = new Customer('1', 'customer test');
    const address = new Address('street test', 123, '12345-123', 'city test');

    customer.Address = address;

    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: '1' } });

    expect(customerModel.toJSON()).toStrictEqual({
      id: '1',
      name: customer.name,
      street: address.street,
      number: address.number,
      zipcode: address.zip,
      city: address.city,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
    });
  });

  it('should update a customer', async () => {
    const customerRepository = new CustomerRepository();

    const customer = new Customer('1', 'customer test');
    const address = new Address('street test', 123, '12345-123', 'city test');

    customer.Address = address;

    await customerRepository.create(customer);

    customer.changeName('customer test updated');

    const addressUpdated = new Address(
      'street test updated',
      123,
      '12345-123',
      'city test updated'
    );

    customer.Address = addressUpdated;

    await customerRepository.update(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: '1' } });

    expect(customerModel.toJSON()).toStrictEqual({
      id: '1',
      name: 'customer test updated',
      street: addressUpdated.street,
      number: addressUpdated.number,
      zipcode: addressUpdated.zip,
      city: addressUpdated.city,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
    });
  });

  it('should find a customer by id', async () => {
    const customerRepository = new CustomerRepository();

    const customer = new Customer('1', 'customer test');
    const address = new Address('street test', 123, '12345-123', 'city test');

    customer.Address = address;

    await customerRepository.create(customer);

    const customerFound = await customerRepository.findById(customer.id);

    expect(customerFound).toStrictEqual(customer);
  });

  it('should find all customers', async () => {
    const customerRepository = new CustomerRepository();

    const customer1 = new Customer('1', 'customer test 1');
    const address1 = new Address(
      'street test 1',
      123,
      '12345-123',
      'city test 1'
    );

    customer1.Address = address1;

    const customer2 = new Customer('2', 'customer test 2');
    const address2 = new Address(
      'street test 2',
      123,
      '12345-123',
      'city test 2'
    );

    customer2.Address = address2;

    await customerRepository.create(customer1);
    await customerRepository.create(customer2);

    const customers = await customerRepository.findAll();

    expect(customers).toStrictEqual([customer1, customer2]);
  });

  it('should throw an error when customer not found', async () => {
    const customerRepository = new CustomerRepository();

    await expect(customerRepository.findById('n0n3x15t5')).rejects.toThrow(
      'Customer not found'
    );
  });
});
