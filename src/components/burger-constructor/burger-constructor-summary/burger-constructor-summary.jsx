import PropTypes from 'prop-types';
import { useContext, useMemo } from 'react';
import {
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorSummaryStyles from './burger-constructor-summary.module.css';
import { orderButtonLabel } from '../../../utils/const';
import { OrderDetailsContext } from '../../../services/dataContext';
import useModalState from '../../../hooks/use-modal-state';
import Modal from '../../modals/modal/modal';
import OrderDetails from '../../order-details/order-details';
import { getOrderDetails } from '../../api/requests';
import { burgerIngredientType } from '../../../utils/types';

const BurgerConstructorSummary = ({ mainBun, ingredients }) => {
  const { orderDetails, setOrderDetails } = useContext(OrderDetailsContext);
  const [isShow, closeHandler, showHandler] = useModalState(showModal);

  async function showModal() {
    try {
      const orderDetailsData = await getOrderDetails(orderIngredientIds);
      setOrderDetails(orderDetailsData);
    } catch (e) {
      console.log(e.message)
    }
  }

  const orderSum = useMemo(
    () => {
      const ingredientsSum = ingredients?.reduce((total, current) => total + current.price, 0)

      return Number(ingredientsSum) + Number(mainBun?.price);
    }, [ingredients, mainBun]);

  const orderIngredientIds = useMemo(
    () => {
      const ingredientIds = ingredients?.map((ingredient) => ingredient._id);
      ingredientIds?.push(mainBun?._id);

      return ingredientIds;
    }, [ingredients, mainBun]);

  const isOrderSum = !isNaN(orderSum);

  return (
    <>
      <div className={burgerConstructorSummaryStyles.container}>
        <p className="text text_type_digits-medium">{isOrderSum && orderSum}</p>
        <CurrencyIcon type="primary" />
      </div>
      <Button onClick={showHandler} type="primary" size="large">
        {orderButtonLabel}
      </Button>

      <Modal isShow={isShow} closeModal={closeHandler}>
        <OrderDetails orderDetailsData={orderDetails}/>
      </Modal>
    </>
  )
}

BurgerConstructorSummary.propTypes = {
  mainBun: burgerIngredientType,
  ingredients: PropTypes.arrayOf(burgerIngredientType),
};

export default BurgerConstructorSummary;
