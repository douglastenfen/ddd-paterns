import Order from './order';
import OrderItem from './order_item';

describe('Order unit tests', () => {
  it('should throw error when ID is empty', () => {
    expect(() => new Order('', '1', [])).toThrow('ID is required');
  });

  it('should throw error when costumer ID is empty', () => {
    expect(() => new Order('1', '', [])).toThrow('Costumer ID is required');
  });

  it('should throw error when items are empty', () => {
    expect(() => new Order('1', '1', [])).toThrow('Items are required');
  });

  it('should calculate total', () => {
    const orderItem1 = new OrderItem('i1', 'p1', 'item1', 100, 2);
    const orderItem2 = new OrderItem('i2', 'p2', 'item2', 200, 2);

    const order1 = new Order('1', '1', [orderItem1]);
    const order2 = new Order('2', '2', [orderItem1, orderItem2]);

    let total = order1.total();

    expect(order1.total()).toBe(200);

    total = order2.total();
    expect(total).toBe(600);
  });

  it('should throw error when quantity is less or equal zero', () => {
    const orderItem = new OrderItem('i1', 'p1', 'item1', 100, 0);

    expect(() => new Order('1', '1', [orderItem])).toThrow(
      'Quantity must be greater than zero'
    );
  });
});
