import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

import { useDispatch } from "../../services/types/hooks";
import {
  wsConnectionStart,
  wsConnectionClosed,
} from "../../services/actions/ws";
import orderFeedDetailsStyles from "./order-feed-details.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ORDER_STATUS_TITLES, TABS_TYPES } from "../../utils/const";
import useOrdersFeed from "../../hooks/use-orders-feed";
import { isAutenticated, getTokenHashString } from "../../services/auth/auth";

export const OrderFeedDetails = (): JSX.Element => {
  const dispatch = useDispatch();
  const {
    state: { isModalOpen, path },
  } = useLocation();
  const { id: orderId } = useParams();
  const { currentOrder, currentOrderPrice, currentOrderDate } =
    useOrdersFeed(orderId);

  useEffect(() => {
    if (path === "/feed") {
      dispatch(wsConnectionStart(`/orders/all`));
    } else if (isAutenticated() && path === `/profile/orders`) {
      const accessToken = getTokenHashString(
        localStorage.getItem("accessToken")
      );
      const wsPath = `/orders?token=${accessToken}`;
      dispatch(wsConnectionStart(wsPath));
    }

    return () => {
      dispatch(wsConnectionClosed());
    };
  }, [dispatch, path]);

  return (
    <div
      className={`${orderFeedDetailsStyles.body} ${
        !isModalOpen && orderFeedDetailsStyles.pageBody
      }`}
    >
      <div className={orderFeedDetailsStyles.header}>
        <p
          className={`text text_type_digits-medium ${
            !isModalOpen
              ? orderFeedDetailsStyles.orderNumberPage
              : orderFeedDetailsStyles.orderNumber
          }`}
        >
          {`#${currentOrder?.orderData?.number}`}
        </p>

        <p className="text text_type_main-medium">
          {currentOrder?.orderData?.name}
        </p>
        <p
          className={`${orderFeedDetailsStyles.status} text text_type_main-default`}
        >
          {ORDER_STATUS_TITLES[currentOrder?.orderData?.status as keyof typeof ORDER_STATUS_TITLES]
          }
        </p>
      </div>
      <div className={orderFeedDetailsStyles.container}>
        <p className="text text_type_main-medium">Состав:</p>
        <div
          className={`${orderFeedDetailsStyles.ingredients} ${
            !isModalOpen && orderFeedDetailsStyles.pageIngredients
          }`}
        >
          {currentOrder?.ingredients?.length &&
            currentOrder?.ingredients?.map(({ image, name, type, price }, key) => (
              <div key={key} className={orderFeedDetailsStyles.ingredient}>
                <div className={orderFeedDetailsStyles.description}>
                  <img
                    className={orderFeedDetailsStyles.image}
                    src={image}
                    alt={name}
                  />
                  <p
                    className={`${orderFeedDetailsStyles.name} text text_type_main-default`}
                  >
                    {name}
                  </p>
                </div>
                <div className={orderFeedDetailsStyles.pricing}>
                  <p
                    className={`${orderFeedDetailsStyles.price} text text_type_digits-default`}
                  >
                    {`${type === TABS_TYPES.bun ? "2" : "1"} x ${price}`}
                  </p>
                  <CurrencyIcon type="primary" />
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className={orderFeedDetailsStyles.footer}>
        <p className="text text_type_main-default text_color_inactive">
          {currentOrderDate}
        </p>
        <div className={orderFeedDetailsStyles.totalPrice}>
          <p
            className={`${orderFeedDetailsStyles.price} text text_type_digits-default`}
          >
            {currentOrderPrice}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};
