import orderDetailsStyles from './order-details.module.css';
import PropTypes from 'prop-types';
import icon from '../../images/icon-done.png'
import { orderDetailsLabels } from '../../utils/const';

function OrderDetails({ orderDetailsData }) {
  return(
    <div className={orderDetailsStyles.container}>
      <p className={`${orderDetailsStyles.number} text text_type_digits-large`}>{orderDetailsData?.order?.number}</p>
      <p className="text text_type_main-medium">{orderDetailsLabels.numberDescription}</p>
      <img className={orderDetailsStyles.icon} src={icon} alt='' />
      <p className={`${orderDetailsStyles.status} text text_type_main-default`}>{orderDetailsLabels.status}</p>
      <p className={`${orderDetailsStyles.comment} text text_type_main-default text_color_inactive`}>
        {orderDetailsLabels.comment}
      </p>
    </div>
  );
}

OrderDetails.propTypes = {
  orderDetailsData: PropTypes.shape({
    name: PropTypes.string,
    order: PropTypes.shape({
      number: PropTypes.number.isRequired
    }),
    success: PropTypes.bool,
  }),
}

export default OrderDetails;
