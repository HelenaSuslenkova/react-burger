import { OrdersList } from '../../components/orders-list/orders-list';
import { OrderItem } from '../../components/orders-list/order-item/order-item';
export const UserOrdersPage = (): JSX.Element => (
  <OrdersList>
    <OrderItem orderStatus />
  </OrdersList>
);
