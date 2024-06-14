import { v4 as uuid } from 'uuid';
import Customer from '../../customer/entity/customer';
import Order from '../entity/order';
import OrderItem from '../entity/order_item';

export default class OrderService {
  static total(orders: Order[]) {
    return orders.reduce((acc, order) => {
      return acc + order.total();
    }, 0);
  }

  static placeOrder(customer: Customer, items: OrderItem[]): Order {
    if (items.length === 0) {
      throw new Error('An order must have at least one item');
    }

    const order = new Order(uuid(), customer.id, items);

    customer.addRewardPoints(order.total() / 2);

    return order;
  }
}
