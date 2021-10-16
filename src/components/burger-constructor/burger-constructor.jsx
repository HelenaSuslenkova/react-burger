import burgerConstructorStyles from "./burger-constructor.module.css";
import {
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { mainBurgerElement, burgerIngredients } from '../../utils/data';
import BurgerConstructorElements from './burger-constructor-elements/burger-constructor-elements';
import Modal from '../modals/modal/modal';
import OrderDetails from '../oder-details/order-details';
import useModalState from '../../hooks/use-modal-state';

function BurgerConstructor() {
  const showModal = (e) => {
    e.preventDefault();
  }

  const [isShow, closeHandler, showHandler] = useModalState(showModal);

  return (
    <>
      <div className={burgerConstructorStyles.container}>
        <div className={burgerConstructorStyles.body}>
          <BurgerConstructorElements
            mainBurgerElement={mainBurgerElement}
            burgerIngredients={burgerIngredients}
          />
        </div>
        <div className={burgerConstructorStyles.footer}>
          <div className={burgerConstructorStyles.orderSummary}>
            <p className="text text_type_digits-medium">610</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button onClick={showHandler} type="primary" size="large">
            Оформить заказ
          </Button>
        </div>
      </div>

      <Modal isShow={isShow} closeModal={closeHandler}>
        <OrderDetails />
      </Modal>
    </>
  );
}

export default BurgerConstructor;
