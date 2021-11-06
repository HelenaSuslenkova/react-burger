import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorSummaryStyles from './burger-constructor-summary.module.css';
import { orderButtonLabel } from '../../../utils/const';
import useModalState from '../../../hooks/use-modal-state';
import Modal from '../../modals/modal/modal';
import OrderDetails from '../../order-details/order-details';
import { burgerIngredientType } from '../../../utils/types';
import { getOrderDetails } from '../../../services/actions/burger-constructor-summary';
import burgerConstructorSummarySelector from '../../../services/selectors/burger-constructor-summary';

const BurgerConstructorSummary = ({ mainBun, ingredients }) => {
  const [isShow, closeHandler, showHandler] = useModalState(showModal);

  const dispatch = useDispatch();
  const orderDetails = useSelector(burgerConstructorSummarySelector.orderDetails.data);

  async function showModal() {
    dispatch(getOrderDetails(orderIngredientIds));
  }

  const orderSum = useMemo(
    () => {
      const ingredientsSum = ingredients?.reduce((total, current) => total + current.price, 0)
      return (Number(ingredientsSum) || 0) + (Number(mainBun?.price) || 0);
    }, [ingredients, mainBun]);

  const orderIngredientIds = useMemo(
    () => {
      return [
        ...ingredients?.map((ingredient) => ingredient._id),
        mainBun?._id,
      ]
    }, [ingredients, mainBun]);

  const isOrderSum = !isNaN(orderSum);
  const isButtonDisabled = !Boolean(ingredients.length);

  return (
    <>
      <div className={burgerConstructorSummaryStyles.container}>
        <p className="text text_type_digits-medium">{isOrderSum && orderSum}</p>
        <CurrencyIcon type="primary" />
      </div>
      <Button onClick={showHandler} type="primary" size="large" disabled={isButtonDisabled}>
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
