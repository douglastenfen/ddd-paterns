import Address from '../../entity/address';
import Customer from '../../entity/customer';
import CustomerAddressChangedEvent from '../customer/customer-address-changed.event';
import CustomerCreatedEvent from '../customer/customer-created.event';
import EnviaConsoleLog1Handler from '../customer/handler/envia-console-log-1.handler';
import EnviaConsoleLog2Handler from '../customer/handler/envia-console-log-2.handler';
import EnviaConsoleLogHandler from '../customer/handler/envia-console-log.handle';
import SendEmailWhenProductIsCreatedHandler from '../product/handler/send-email-when-product-is-created.handler';
import ProductCreatedEvent from '../product/product-created.event';
import EventDispatcher from './event-dispatcher';

describe('Domain events tests', () => {
  describe('ProductCreatedEvents', () => {
    it('should register a product created event handler', () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendEmailWhenProductIsCreatedHandler();

      eventDispatcher.register('ProductCreatedEvent', eventHandler);

      expect(
        eventDispatcher.getEventHandlers['ProductCreatedEvent']
      ).toBeDefined();

      expect(
        eventDispatcher.getEventHandlers['ProductCreatedEvent'].length
      ).toBe(1);

      expect(
        eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]
      ).toMatchObject(eventHandler);
    });

    it('should unregister a product created event handler', () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendEmailWhenProductIsCreatedHandler();

      eventDispatcher.register('ProductCreatedEvent', eventHandler);

      expect(
        eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]
      ).toMatchObject(eventHandler);

      eventDispatcher.unregister('ProductCreatedEvent', eventHandler);

      expect(
        eventDispatcher.getEventHandlers['ProductCreatedEvent'].length
      ).toBe(0);
    });

    it('should unregister all product created events handlers', () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendEmailWhenProductIsCreatedHandler();

      eventDispatcher.register('ProductCreatedEvent', eventHandler);

      expect(
        eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]
      ).toMatchObject(eventHandler);

      eventDispatcher.unregisterAll();

      expect(
        eventDispatcher.getEventHandlers['ProductCreatedEvent']
      ).toBeUndefined();
    });

    it('should notify all product created events handlers', () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendEmailWhenProductIsCreatedHandler();
      const spyEventHandler = jest.spyOn(eventHandler, 'handle');

      eventDispatcher.register('ProductCreatedEvent', eventHandler);

      expect(
        eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]
      ).toMatchObject(eventHandler);

      const productCreatedEvent = new ProductCreatedEvent({
        name: 'Product 1',
        description: 'Product 1 description',
        price: 100,
      });

      eventDispatcher.notify(productCreatedEvent);

      expect(spyEventHandler).toHaveBeenCalled();
    });
  });

  describe('CustomerCreatedEvents', () => {
    it('should register a customer created event handler', () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler1 = new EnviaConsoleLog1Handler();
      const eventHandler2 = new EnviaConsoleLog2Handler();

      eventDispatcher.register('CustomerCreatedEvent', eventHandler1);
      eventDispatcher.register('CustomerCreatedEvent', eventHandler2);

      expect(
        eventDispatcher.getEventHandlers['CustomerCreatedEvent']
      ).toBeDefined();

      expect(
        eventDispatcher.getEventHandlers['CustomerCreatedEvent'].length
      ).toBe(2);

      expect(
        eventDispatcher.getEventHandlers['CustomerCreatedEvent']
      ).toMatchObject([eventHandler1, eventHandler2]);
    });

    it('should unregister a customer created event handler', () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler1 = new EnviaConsoleLog1Handler();
      const eventHandler2 = new EnviaConsoleLog2Handler();

      eventDispatcher.register('CustomerCreatedEvent', eventHandler1);
      eventDispatcher.register('CustomerCreatedEvent', eventHandler2);

      expect(
        eventDispatcher.getEventHandlers['CustomerCreatedEvent']
      ).toMatchObject([eventHandler1, eventHandler2]);

      eventDispatcher.unregister('CustomerCreatedEvent', eventHandler1);

      expect(
        eventDispatcher.getEventHandlers['CustomerCreatedEvent'].length
      ).toBe(1);

      eventDispatcher.unregister('CustomerCreatedEvent', eventHandler2);

      expect(
        eventDispatcher.getEventHandlers['CustomerCreatedEvent'].length
      ).toBe(0);
    });

    it('should unregister all customer created events handlers', () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler1 = new EnviaConsoleLog1Handler();
      const eventHandler2 = new EnviaConsoleLog2Handler();

      eventDispatcher.register('CustomerCreatedEvent', eventHandler1);
      eventDispatcher.register('CustomerCreatedEvent', eventHandler2);

      expect(
        eventDispatcher.getEventHandlers['CustomerCreatedEvent']
      ).toMatchObject([eventHandler1, eventHandler2]);

      eventDispatcher.unregisterAll();

      expect(
        eventDispatcher.getEventHandlers['CustomerCreatedEvent']
      ).toBeUndefined();
    });

    it('should notify all customer created events handlers', () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler1 = new EnviaConsoleLog1Handler();
      const eventHandler2 = new EnviaConsoleLog2Handler();

      const spyEventHandler1 = jest.spyOn(eventHandler1, 'handle');
      const spyEventHandler2 = jest.spyOn(eventHandler2, 'handle');

      eventDispatcher.register('CustomerCreatedEvent', eventHandler1);
      eventDispatcher.register('CustomerCreatedEvent', eventHandler2);

      expect(
        eventDispatcher.getEventHandlers['CustomerCreatedEvent']
      ).toMatchObject([eventHandler1, eventHandler2]);

      const customer = new Customer('1', 'John Doe');
      const customerCreatedEvent = new CustomerCreatedEvent(customer);

      eventDispatcher.notify(customerCreatedEvent);

      expect(spyEventHandler1).toHaveBeenCalled();
      expect(spyEventHandler2).toHaveBeenCalled();
    });
  });

  describe('CustomerAddressChangedEvents', () => {
    it('should register a customer address changed event handler', () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new EnviaConsoleLogHandler();

      eventDispatcher.register('CustomerAddressChangedEvent', eventHandler);

      expect(
        eventDispatcher.getEventHandlers['CustomerAddressChangedEvent']
      ).toBeDefined();

      expect(
        eventDispatcher.getEventHandlers['CustomerAddressChangedEvent'].length
      ).toBe(1);

      expect(
        eventDispatcher.getEventHandlers['CustomerAddressChangedEvent'][0]
      ).toMatchObject(eventHandler);
    });

    it('should unregister a customer address changed event handler', () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new EnviaConsoleLogHandler();

      eventDispatcher.register('CustomerAddressChangedEvent', eventHandler);

      expect(
        eventDispatcher.getEventHandlers['CustomerAddressChangedEvent'][0]
      ).toMatchObject(eventHandler);

      eventDispatcher.unregister('CustomerAddressChangedEvent', eventHandler);

      expect(
        eventDispatcher.getEventHandlers['CustomerAddressChangedEvent'].length
      ).toBe(0);
    });

    it('should unregister all customer address changed events handlers', () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new EnviaConsoleLogHandler();

      eventDispatcher.register('CustomerAddressChangedEvent', eventHandler);

      expect(
        eventDispatcher.getEventHandlers['CustomerAddressChangedEvent'][0]
      ).toMatchObject(eventHandler);

      eventDispatcher.unregisterAll();

      expect(
        eventDispatcher.getEventHandlers['CustomerAddressChangedEvent']
      ).toBeUndefined();
    });

    it('should notify all customer address changed events handlers', () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new EnviaConsoleLogHandler();

      const spyEventHandler = jest.spyOn(eventHandler, 'handle');

      eventDispatcher.register('CustomerAddressChangedEvent', eventHandler);

      expect(
        eventDispatcher.getEventHandlers['CustomerAddressChangedEvent'][0]
      ).toMatchObject(eventHandler);

      const customer = new Customer('1', 'John Doe');
      const address = new Address('Street 1', 1, '12345-678', 'Cityland');

      customer.changeAddress(address);

      const customerAddressChangedEvent = new CustomerAddressChangedEvent({
        id: customer.id,
        name: customer.name,
        address: customer.Address,
      });

      eventDispatcher.notify(customerAddressChangedEvent);

      expect(spyEventHandler).toHaveBeenCalled();
    });
  });
});
