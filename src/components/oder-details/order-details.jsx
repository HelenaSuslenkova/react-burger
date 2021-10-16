import orderDetailsStyles from './order-details.module.css';
import { orderDetailsData } from '../../utils/data';
import icon from '../../images/icon-done.png'

function OrderDetails() {
  return(
    <div className={orderDetailsStyles.container}>
      <p className={`${orderDetailsStyles.number} text text_type_digits-large`}>{orderDetailsData.number}</p>
      <p className="text text_type_main-medium">{orderDetailsData.description}</p>
      <img className={orderDetailsStyles.icon} src={icon} alt='' />
      <p className={`${orderDetailsStyles.status} text text_type_main-default`}>{orderDetailsData.status}</p>
      <p className={`${orderDetailsStyles.comment} text text_type_main-default text_color_inactive`}>
        {orderDetailsData.comment}
      </p>
    </div>
  );
}

export default OrderDetails;
