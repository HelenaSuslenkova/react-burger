import { FC } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import orderItemStyles from "./order-item.module.css";
import { OrderData } from "../../../utils/types";
import useOrdersFeed from "../../../hooks/use-orders-feed";

type OrderItemProps = {
  order: OrderData;
};

const MAX_ORDER_INGREDIENTS = 5;

export const OrderItem: FC<OrderItemProps> = ({ order }): JSX.Element => {
  const {
    orderData: { name, number, _id },
    ingredients,
  } = order;

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { currentOrderPrice, currentOrderDate } = useOrdersFeed(_id);

  return (
    <div
      key={_id}
      className={orderItemStyles.order}
      onClick={() => {
        navigate(`${_id}`, {
          state: {
            isModalOpen: true,
            path: pathname,
          },
        });
      }}
    >
      <div className={orderItemStyles.info}>
        <p className="text text_type_digits-default">{`#${number}`}</p>
        <p className="text text_type_main-default text_color_inactive">
          {currentOrderDate}
        </p>
      </div>
      <div className={orderItemStyles.title}>
        <span className="text text_type_main-medium">{name}</span>
      </div>
      <div className={orderItemStyles.ingredients}>
        <div className={orderItemStyles.images}>
          {ingredients
            ?.slice(0, MAX_ORDER_INGREDIENTS)
            ?.map((ingredient, index) => {
              let imageZindex = ingredients.length - index;
              let imagePosition = index * 20;
              return (
                <div
                  key={index}
                  className={orderItemStyles.imageContainer}
                  style={{ zIndex: imageZindex, right: imagePosition }}
                >
                  <img
                    className={orderItemStyles.image}
                    src={ingredient.image}
                    alt={ingredient.name}
                  />
                  {index === 4 &&
                    ingredients.length > MAX_ORDER_INGREDIENTS && (
                      <p
                        className={`${orderItemStyles.additionalCount} text text_type_digits-default`}
                      >
                        {`+${ingredients.length - MAX_ORDER_INGREDIENTS}`}
                      </p>
                    )}
                </div>
              );
            })}
        </div>
        <div className={orderItemStyles.priceInfo}>
          <p
            className={`${orderItemStyles.price} text text_type_digits-default`}
          >
            {currentOrderPrice}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};
