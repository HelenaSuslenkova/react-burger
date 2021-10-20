import { useContext, useMemo } from 'react';
import {
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorSummaryStyles from './burger-constructor-summary.module.css';
import { orderButtonLabel } from '../../../utils/const';
import {
  MainBunContext,
  IngredientsContext,
  OrderDetailsContext,
} from '../../../services/dataContext';
import useModalState from '../../../hooks/use-modal-state';
import Modal from '../../modals/modal/modal';
import OrderDetails from '../../order-details/order-details';
import { getOrderDetails } from '../../api/requests';

const BurgerConstructorSummary = () => {
  const { mainBun } = useContext(MainBunContext);
  const { ingredients } = useContext(IngredientsContext);
  const { orderDetails, setOrderDetails } = useContext(OrderDetailsContext);

  const [isShow, closeHandler, showHandler] = useModalState(showModal);

  async function showModal(){
    const orderDetailsData = await getOrderDetails(orderIngredientIds);
    setOrderDetails(orderDetailsData);
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

export default BurgerConstructorSummary;
