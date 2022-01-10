import { FC } from 'react';
import orderFeedDetailsStyles from './order-feed-details.module.css';
import tempImage from '../../images/icon-done.png'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

type OrderFeedDetailsProps = {

}
export const OrderFeedDetails: FC<OrderFeedDetailsProps> = ({ }): JSX.Element => {
  return (
    <div className={orderFeedDetailsStyles.body}>
      <div className={orderFeedDetailsStyles.header}>
        <p className='text text_type_main-medium'>Black Hole Singularity острый бургер</p>
        <p className={`${orderFeedDetailsStyles.status} text text_type_main-default`}>Выполнен</p>

      </div>
      <div className={orderFeedDetailsStyles.container}>
        <p className='text text_type_main-medium'>Состав:</p>
        <div className={orderFeedDetailsStyles.orders}>
          <div className={orderFeedDetailsStyles.order}>
            <div className={orderFeedDetailsStyles.description}>
              <img className={orderFeedDetailsStyles.image} src={tempImage} alt='' />
              <p className={`${orderFeedDetailsStyles.name} text text_type_main-default`}>Флюоресцентная булка R2-D3</p>
            </div>
            <div className={orderFeedDetailsStyles.pricing}>
              <p className={`${orderFeedDetailsStyles.price} text text_type_digits-default`}>2 x 20</p>
              <CurrencyIcon type='primary' />
            </div>
          </div>
          <div className={orderFeedDetailsStyles.order}>
            <div className={orderFeedDetailsStyles.description}>
              <img className={orderFeedDetailsStyles.image} src={tempImage} alt='' />
              <p className={`${orderFeedDetailsStyles.name} text text_type_main-default`}>Флюоресцентная булка R2-D3</p>
            </div>
            <div className={orderFeedDetailsStyles.pricing}>
              <p className={`${orderFeedDetailsStyles.price} text text_type_digits-default`}>2 x 20</p>
              <CurrencyIcon type='primary' />
            </div>
          </div>
          <div className={orderFeedDetailsStyles.order}>
            <div className={orderFeedDetailsStyles.description}>
              <img className={orderFeedDetailsStyles.image} src={tempImage} alt='' />
              <p className={`${orderFeedDetailsStyles.name} text text_type_main-default`}>Флюоресцентная булка R2-D3</p>
            </div>
            <div className={orderFeedDetailsStyles.pricing}>
              <p className={`${orderFeedDetailsStyles.price} text text_type_digits-default`}>2 x 20</p>
              <CurrencyIcon type='primary' />
            </div>
          </div>
          <div className={orderFeedDetailsStyles.order}>
            <div className={orderFeedDetailsStyles.description}>
              <img className={orderFeedDetailsStyles.image} src={tempImage} alt='' />
              <p className={`${orderFeedDetailsStyles.name} text text_type_main-default`}>Флюоресцентная булка R2-D3</p>
            </div>
            <div className={orderFeedDetailsStyles.pricing}>
              <p className={`${orderFeedDetailsStyles.price} text text_type_digits-default`}>2 x 20</p>
              <CurrencyIcon type='primary' />
            </div>
          </div>
          <div className={orderFeedDetailsStyles.order}>
            <div className={orderFeedDetailsStyles.description}>
              <img className={orderFeedDetailsStyles.image} src={tempImage} alt='' />
              <p className={`${orderFeedDetailsStyles.name} text text_type_main-default`}>Флюоресцентная булка R2-D3</p>
            </div>
            <div className={orderFeedDetailsStyles.pricing}>
              <p className={`${orderFeedDetailsStyles.price} text text_type_digits-default`}>2 x 20</p>
              <CurrencyIcon type='primary' />
            </div>
          </div>
          <div className={orderFeedDetailsStyles.order}>
            <div className={orderFeedDetailsStyles.description}>
              <img className={orderFeedDetailsStyles.image} src={tempImage} alt='' />
              <p className={`${orderFeedDetailsStyles.name} text text_type_main-default`}>Флюоресцентная булка R2-D3</p>
            </div>
            <div className={orderFeedDetailsStyles.pricing}>
              <p className={`${orderFeedDetailsStyles.price} text text_type_digits-default`}>2 x 20</p>
              <CurrencyIcon type='primary' />
            </div>
          </div>
        </div>
      </div>
      <div className={orderFeedDetailsStyles.footer}>
        <p className='text text_type_main-default text_color_inactive'>Вчера, 13:50 i-GMT+3</p>
        <div className={orderFeedDetailsStyles.totalPrice}>
          <p className={`${orderFeedDetailsStyles.price} text text_type_digits-default`}>510</p>
          <CurrencyIcon type='primary' />
        </div>
      </div>

    </div>
  );
}
