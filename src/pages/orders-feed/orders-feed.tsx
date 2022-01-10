
import orderFeedStyles from './orders-feed.module.css';
import { OrdersList } from '../../components/orders-list/orders-list';
import { OrdersSummary } from '../../components/orders-summary/orders-summary';
import { OrderItem } from '../../components/orders-list/order-item/order-item';

export const OrdersFeedPage = (): JSX.Element => {
  const orderListTitle = 'Лента заказов';
  return (
    <main className={orderFeedStyles.container}>
      <section className={orderFeedStyles.section}>
        <OrdersList headerTitle={orderListTitle}>
          <OrderItem orderStatus={false}/>
        </OrdersList>
      </section>
      <section className={orderFeedStyles.section}>
        <OrdersSummary />
      </section>
    </main>
  );
}
