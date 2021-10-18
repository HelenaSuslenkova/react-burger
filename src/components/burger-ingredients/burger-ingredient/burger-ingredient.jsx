import { useRef } from 'react';
import burgerIngredientStyles from './burger-ingredient.module.css';
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../../modals/modal/modal';
import IngredientDetails from '../../ingredient-details/ingredient-details';
import useModalState from '../../../hooks/use-modal-state';
import { burgerIngredientType } from '../../../utils/types';

function BurgerIngredient({ ingredient }) {
  const modalTitle = "Детали ингридиента"
  const { image, name, price } = ingredient;
  const burgerIngredientRef = useRef(null);

  const showModal = (e) => {
    e.preventDefault();
  }

  const [isShow, closeHandler, showHandler ] = useModalState(showModal);

  return (
    <>
      <div
        ref={burgerIngredientRef}
        onClick={showHandler}
        className={burgerIngredientStyles.categorie__item}
      >
        <img className={burgerIngredientStyles.picture} src={image} alt=''/>
        <div className={burgerIngredientStyles.price}>
          <p className="text text_type_digits-default">{price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className="name text text_type_main-default">{name}</p>
        <Counter className={burgerIngredientStyles.counter} count={1} size="default" />
      </div>

      <Modal isShow={isShow} title={modalTitle} closeModal={closeHandler}>
        <IngredientDetails ingredient={ingredient}/>
      </Modal>
    </>
  );
}

BurgerIngredient.propTypes = {
  ingredient: burgerIngredientType,
}

export default BurgerIngredient;
