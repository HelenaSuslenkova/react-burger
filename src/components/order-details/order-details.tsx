import { FC } from 'react';
import orderDetailsStyles from './order-details.module.css';
import icon from '../../images/icon-done.png'
import { ORDER_DETAILS_LABELS } from '../../utils/const';

type OrderNumber = {
  number: number;
}
type orderDetailsData = {
  name: string;
  order: OrderNumber;
  success: boolean;
}

type OrderDetailsProps = {
  orderDetailsData: orderDetailsData;
}
export const OrderDetails: FC<OrderDetailsProps> = ({ orderDetailsData }): JSX.Element => {
  return(
    <div className={orderDetailsStyles.container}>
      <p className={`${orderDetailsStyles.number} text text_type_digits-large`}>{orderDetailsData?.order?.number}</p>
      <p className="text text_type_main-medium">{ORDER_DETAILS_LABELS.numberDescription}</p>
      <img className={orderDetailsStyles.icon} src={icon} alt='' />
      <p className={`${orderDetailsStyles.status} text text_type_main-default`}>{ORDER_DETAILS_LABELS.status}</p>
      <p className={`${orderDetailsStyles.comment} text text_type_main-default text_color_inactive`}>
        {ORDER_DETAILS_LABELS.comment}
      </p>
    </div>
  );
}
