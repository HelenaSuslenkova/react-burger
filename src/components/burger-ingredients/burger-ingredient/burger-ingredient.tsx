import { useMemo, FC } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDrag } from "react-dnd";
import burgerIngredientStyles from './burger-ingredient.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIngredientType } from '../../../utils/types';
import { DRAGGABLE_TYPES, TABS_TYPES } from '../../../utils/const';
import burgerConstructorElementsSelector from '../../../services/selectors/burger-constructor-elements';

type BurgerIngredientProps = {
  ingredient: BurgerIngredientType;
}

export const BurgerIngredient: FC<BurgerIngredientProps> = ({ ingredient }): JSX.Element => {
  const { _id, type, image, name, price } = ingredient;
  const elements = useSelector(burgerConstructorElementsSelector.elements);
  const mainBun = useSelector(burgerConstructorElementsSelector.mainBun);

  const [, burgerIngredientRef] = useDrag({
    type: DRAGGABLE_TYPES.ingredient,
    item: ingredient,
  });

  const count = useMemo<number | null>(
    () => {
      const data = [...elements, mainBun];
      const currentElements = data?.filter((element) => element._id === _id);

      return (type === TABS_TYPES.bun ? currentElements.length * 2 : currentElements.length) || null;
    }, [elements, mainBun, _id, type]);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <>
      <div
        ref={burgerIngredientRef}
        onClick={() => {
          navigate(`ingredients/${_id}`, {
            state: {
              isModalOpen: true,
              path: pathname,
            }
          });
        }}
        className={burgerIngredientStyles.categorie__item}
      >
        <img className={burgerIngredientStyles.picture} src={image} alt=''/>
        <div className={burgerIngredientStyles.price}>
          <p className="text text_type_digits-default">{price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className="name text text_type_main-default">{name}</p>
        {count && <Counter count={count} size="default" />}
      </div>
    </>
  );
}
