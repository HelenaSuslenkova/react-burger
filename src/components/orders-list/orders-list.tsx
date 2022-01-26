import { FC } from "react";
import ordersListStyles from "./orders-list.module.css";

type OrdersListProps = {
  headerTitle?: string;
};

export const OrdersList: FC<OrdersListProps> = ({
  headerTitle = "",
  children,
}): JSX.Element => {

  return (
    <div className={ordersListStyles.body}>
      {headerTitle && (
        <p className={`${ordersListStyles.header} text text_type_main-large`}>
          {headerTitle}
        </p>
      )}
      <div className={ordersListStyles.container}>{children}</div>
    </div>
  );
};
