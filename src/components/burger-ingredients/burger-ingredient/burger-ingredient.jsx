import { useRef } from 'react';
import PropTypes from 'prop-types';
import burgerIngredientStyles from "./burger-ingredient.module.css";
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../../modals/modal/modal';
import IngredientDetails from '../../ingredient-details/ingredient-details';
import useModalState from '../../../hooks/use-modal-state';

function BurgerIngredient({ ingredient }) {
  const modalTitle = "Детали ингридиента"
  const { image, name, price, _id } = ingredient;
  const burgerIngredientRef = useRef(null);

  const showModal = (e) => {
    console.log(burgerIngredientRef);
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
  ingredient: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number,
  }).isRequired,
}

export default BurgerIngredient;
