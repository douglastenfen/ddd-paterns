import Address from '../value-object/address';
import CustomerFactory from './customer.factory';

describe('Customer factory unit tests', () => {
  it('should create a customer', () => {
    const customer = CustomerFactory.create('John Doe');

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe('John Doe');
    expect(customer.Address).toBeUndefined();
  });

  it('should create a customer with address', () => {
    const address = new Address('Main St', 123, '12345-678', 'Springfield');
    const customer = CustomerFactory.createWithAddress('John Doe', address);

    customer.changeAddress(address);

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe('John Doe');
    expect(customer.Address).toBe(address);
  });
});
