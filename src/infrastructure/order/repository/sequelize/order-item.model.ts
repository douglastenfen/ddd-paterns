import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import ProductModel from '../../../product/repository/sequelize/product.model';
import OrderModel from './order.model';

@Table({
  tableName: 'order_items',
  timestamps: false,
})
export default class OrderItemModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @ForeignKey(() => ProductModel)
  @Column
  declare product_id: string;

  @ForeignKey(() => OrderModel)
  @Column
  declare order_id: string;

  @Column({ allowNull: false })
  declare quantity: number;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare price: number;

  @BelongsTo(() => ProductModel)
  declare product: ProductModel;

  @BelongsTo(() => OrderModel)
  declare order: OrderModel;
}
