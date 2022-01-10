import { FC } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import tempImage from '../../../images/icon-done.png'
import orderItemStyles from "./order-item.module.css";

type OrderItemProps = {
  orderStatus: boolean;
}

export const OrderItem: FC<OrderItemProps> = ({ orderStatus }): JSX.Element => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div
      className={orderItemStyles.order}
      onClick={() => {
        navigate(`03dhf67`, {
          state: {
            isModalOpen: true,
            path: pathname,
          }
        });
      }}
    >
      <div className={orderItemStyles.info}>
        <p className="text text_type_digits-default">#3678371</p>
        <p className="text text_type_main-default text_color_inactive">Сегодня, 16:20 i-GMT+3</p>
      </div>
      <div className={orderItemStyles.title}>
        <span className='text text_type_main-medium'>Death Star Starship Main бургер</span>
      </div>
      <div className={orderItemStyles.ingredients}>
        <div className={orderItemStyles.images}>
          <img className={orderItemStyles.ingredientImage} src={tempImage} alt='' />
          <img className={orderItemStyles.ingredientImage} src={tempImage} alt='' />
          <img className={orderItemStyles.ingredientImage} src={tempImage} alt='' />
          <img className={orderItemStyles.ingredientImage} src={tempImage} alt='' />

        </div>
        <div className={orderItemStyles.priceInfo}>
          <p className={`${orderItemStyles.price} text text_type_digits-default`}>314</p>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </div>
  );
}
