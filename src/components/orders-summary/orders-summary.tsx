import { FC, useMemo } from "react";
import ordersSummaryStyles from "./orders-summary.module.css";
import { useSelector } from "../../services/types/hooks";
import { wsSelector } from "../../services/selectors/ws";
import { ORDER_STATUS } from "../../utils/const";
import { FeedOrders } from "../../utils/types";

const MAX_ORDERS = 5;
export const OrdersSummary = (): JSX.Element => {
  const { total, totalToday, orders } = useSelector(wsSelector.wsData);

  const ordersDone = useMemo(() => {
    return orders?.reduce((result: number[], order: FeedOrders): number[] => {
      order.status === ORDER_STATUS.done && result.push(order?.number);
      return result;
    }, []);
  }, [orders]);

  const ordersPreparing = useMemo(() => {
    return orders?.reduce((result: number[], order: FeedOrders): number[] => {
      order.status !== ORDER_STATUS.created && result.push(order?.number);
      return result;
    }, []);
  }, [orders]);

  return (
    <div className={ordersSummaryStyles.container}>
      <div className={ordersSummaryStyles.statuses}>
        <div className={ordersSummaryStyles.status}>
          <p
            className={`${ordersSummaryStyles.header} text text_type_main-medium`}
          >
            Готовы:
          </p>
          <div className={ordersSummaryStyles.doneOrders}>
            <div className={ordersSummaryStyles.done}>
              {ordersDone
                .slice(0, MAX_ORDERS)
                ?.map((orderNumber: number, index: number) => (
                  <p
                    key={index}
                    className={`${ordersSummaryStyles.orderId} text text_type_digits-default`}
                  >
                    {orderNumber}
                  </p>
                ))}
            </div>
            <div className={ordersSummaryStyles.done}>
              {ordersDone
                .slice(MAX_ORDERS, MAX_ORDERS * 2)
                ?.map((orderNumber: number, index: number) => (
                  <p
                    key={index}
                    className={`${ordersSummaryStyles.orderId} text text_type_digits-default`}
                  >
                    {orderNumber}
                  </p>
                ))}
            </div>
          </div>
        </div>
        <div className={ordersSummaryStyles.status}>
          <p
            className={`${ordersSummaryStyles.header} text text_type_main-medium`}
          >
            В работе:
          </p>
          <div className={ordersSummaryStyles.preparingOrders}>
            <div className={ordersSummaryStyles.preparing}>
              {ordersPreparing
                .slice(0, MAX_ORDERS)
                ?.map((orderNumber: number, index: number) => (
                  <p
                  key={index}
                  className={`${ordersSummaryStyles.orderId} text text_type_digits-default`}
                >
                  {orderNumber}
                </p>
                ))}
            </div>
            <div className={ordersSummaryStyles.preparing}>
              {ordersPreparing
                .slice(MAX_ORDERS, MAX_ORDERS * 2)
                ?.map((orderNumber: number, index: number) => (
                  <p
                  key={index}
                  className={`${ordersSummaryStyles.orderId} text text_type_digits-default`}
                >
                  {orderNumber}
                </p>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className={ordersSummaryStyles.total}>
        <p className="text text_type_main-medium">Выполнено за все время:</p>
        <p className="text text_type_digits-large">{total}</p>
      </div>
      <div className={ordersSummaryStyles.total}>
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <p className="text text_type_digits-large">{totalToday}</p>
      </div>
    </div>
  );
};
