import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useDrag } from "react-dnd";
import burgerIngredientStyles from './burger-ingredient.module.css';
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../../modals/modal/modal';
import IngredientDetails from '../../ingredient-details/ingredient-details';
import useModalState from '../../../hooks/use-modal-state';
import { burgerIngredientType } from '../../../utils/types';
import { modalTitle } from '../../../utils/const';
import { DRAGGABLE_TYPES } from '../../../utils/const';
import burgerConstructorElementsSelector from '../../../services/selectors/burger-constructor-elements';

function BurgerIngredient({ ingredient }) {
  const { _id, image, name, price } = ingredient;
  const elements = useSelector(burgerConstructorElementsSelector.elements);
  const mainBun = useSelector(burgerConstructorElementsSelector.mainBun);

  const [, burgerIngredientRef] = useDrag({
    type: DRAGGABLE_TYPES.ingredient,
    item: ingredient,
  });

  const count = useMemo(
    () => {
      const data = [...elements, mainBun];
      const currentElements = data?.filter((element) => element._id === _id);

      return currentElements.length || null;
    }, [elements, mainBun]);

  const [isShow, closeHandler, showHandler ] = useModalState();

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
        {count && <Counter className={burgerIngredientStyles.counter} count={count} size="default" />}
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
