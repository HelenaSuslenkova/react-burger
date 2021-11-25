import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorSummaryStyles from './burger-constructor-summary.module.css';
import { orderButtonLabel } from '../../../utils/const';
import useModalState from '../../../hooks/use-modal-state';
import Modal from '../../modals/modal/modal';
import OrderDetails from '../../order-details/order-details';
import { getOrderDetails } from '../../../services/actions/burger-constructor-summary';
import burgerConstructorSummarySelector from '../../../services/selectors/burger-constructor-summary';
import burgerConstructorElementsSelector from '../../../services/selectors/burger-constructor-elements';
import isAutenticated from '../../../services/auth/auth';
import { generateRoutePath, RouteName } from '../../../routes/helper';
import { MODAL_TYPES } from '../../../utils/const';

const BurgerConstructorSummary = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mainBun = useSelector(burgerConstructorElementsSelector.mainBun);
  const ingredients = useSelector(burgerConstructorElementsSelector.elements);
  const orderDetails = useSelector(burgerConstructorSummarySelector.orderDetails.data);

  const [isShow, closeHandler, showHandler] = useModalState(showModal);

  async function showModal() {
    if (!isAutenticated()) {
      navigate(generateRoutePath({name: RouteName.login}))
    } else {
      dispatch(getOrderDetails(orderIngredientIds));
    }
  }

  const orderSum = useMemo(
    () => {
      const ingredientsSum = ingredients?.reduce((total, current) => total + current.price, 0)
      return (Number(ingredientsSum) || 0) + (Number(mainBun?.price * 2) || 0);
    }, [ingredients, mainBun]);

  const orderIngredientIds = useMemo(
    () => {
      return [
        ...ingredients?.map((ingredient) => ingredient._id),
        mainBun?._id,
      ]
    }, [ingredients, mainBun]);

  const isOrderSum = !isNaN(orderSum);
  const isButtonDisabled = !Boolean(ingredients.length) || !Boolean(Object.keys(mainBun).length);

  return (
    <>
      <div className={burgerConstructorSummaryStyles.container}>
        <p className="text text_type_digits-medium">{isOrderSum && orderSum}</p>
        <CurrencyIcon type="primary" />
      </div>
      <Button onClick={showHandler} type="primary" size="large" disabled={isButtonDisabled}>
        {orderButtonLabel}
      </Button>

      { isShow &&
        <Modal isShow={isShow} modalType={MODAL_TYPES.modalOrder} closeModal={closeHandler}>
          <OrderDetails orderDetailsData={orderDetails}/>
        </Modal>
      }
    </>
  )
}

export default BurgerConstructorSummary;
