import { useEffect } from "react";
import { useDispatch } from "../../services/types/hooks";
import { OrdersList } from "../../components/orders-list/orders-list";
import { wsConnectionStart, wsConnectionClosed } from "../../services/actions/ws";
import { OrderItem } from "../../components/orders-list/order-item/order-item";
import useOrdersFeed from "../../hooks/use-orders-feed";
import { OrderData } from "../../utils/types";
import { isAutenticated, getTokenHashString } from '../../services/auth/auth';

export const UserOrdersPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const [ordersData, isNotOrdersEmpty] = useOrdersFeed();


  useEffect(() => {
    if (isAutenticated()) {
      const accessToken = getTokenHashString(localStorage.getItem("accessToken"));
      const path =`/orders?token=${accessToken}`;
      dispatch(wsConnectionStart(path));
    }

    return () => {
      dispatch(wsConnectionClosed())
    }
  }, [dispatch]);

  return (
    <OrdersList>
      {isNotOrdersEmpty && ordersData.length &&
        ordersData.map((order: OrderData, key: number) => (
          <OrderItem order={order} key={key} />
        ))}
    </OrdersList>
  );
};
