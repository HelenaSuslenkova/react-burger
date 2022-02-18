import { useEffect } from "react";
import { useDispatch } from "../../services/types/hooks";
import orderFeedStyles from "./orders-feed.module.css";

import { OrdersList } from "../../components/orders-list/orders-list";
import { OrdersSummary } from "../../components/orders-summary/orders-summary";
import { OrderItem } from "../../components/orders-list/order-item/order-item";
import { wsConnectionStart, wsConnectionClosed } from "../../services/actions/ws";
import useOrdersFeed from '../../hooks/use-orders-feed';
import { OrderData } from "../../utils/types";

export const OrdersFeedPage = (): JSX.Element => {
  const orderListTitle = "Лента заказов";
  const dispatch = useDispatch();
  const {ordersData, isNotOrdersEmpty} = useOrdersFeed();

  useEffect(() => {
    dispatch(wsConnectionStart(`/orders/all`));

    return () => {
      dispatch(wsConnectionClosed())
    }
  }, [dispatch]);

  return (
    <main className={orderFeedStyles.container}>
      <section className={orderFeedStyles.section}>
        <OrdersList headerTitle={orderListTitle}>
          {isNotOrdersEmpty && ordersData.length && ordersData.map((order: OrderData, key: number) => (
            <OrderItem order={order} key={key}/>
          ))}
        </OrdersList>
      </section>
      <section className={orderFeedStyles.section}>
        <OrdersSummary />
      </section>
    </main>
  );
};
