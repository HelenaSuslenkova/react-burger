import { useDispatch, useSelector } from '../../../services/types/hooks';
import { useDrop } from "react-dnd";
import { BurgerConstructorElement } from './burger-constructor-element/burger-constructor-element';
import burgerConstructorElementsStyles from './burger-constructor-elements.module.css';
import { DEFAULT_MESSAGE_TITLE } from '../../../utils/const';
import { DRAGGABLE_TYPES, TABS_TYPES } from '../../../utils/const';
import { setBurgerMainBun, setBurgerElements } from '../../../services/actions/burger-constructor-elements';
import burgerConstructorElementsSelector from '../../../services/selectors/burger-constructor-elements';
import { BurgerIngredientType } from '../../../utils/types';

export const BurgerConstructorElements = (): JSX.Element => {
  const dispatch = useDispatch();
  const mainBun = useSelector(burgerConstructorElementsSelector.mainBun);
  const ingredients = useSelector(burgerConstructorElementsSelector.elements);

  const isEmptyBurgerConstructor = mainBun && !Object.keys(mainBun).length && ingredients && !ingredients.length;
  const isMainBun = mainBun && !!Object.keys(mainBun).length;

  const onDropHandler = (item: BurgerIngredientType) => {
    const isItemBun = item.type === TABS_TYPES.bun;
    isItemBun ? dispatch(setBurgerMainBun(item)) : dispatch(setBurgerElements(item));
  };

  const [, burgerElementRef] = useDrop({
    accept: DRAGGABLE_TYPES.ingredient,
    drop(burgerElement: BurgerIngredientType) {
      onDropHandler(burgerElement);
    },
  });

  return (
    <div className={burgerConstructorElementsStyles.ingredients} ref={burgerElementRef}>
      {isEmptyBurgerConstructor ? (
        <p className={`${burgerConstructorElementsStyles.emtyMessage} text text_type_main-default text_color_inactive`}>{DEFAULT_MESSAGE_TITLE}</p>
      ) : (
        <>
        {isMainBun && (
          <BurgerConstructorElement element={mainBun} main position='top' onDropHandler={onDropHandler}/>
        )}
        <div className={burgerConstructorElementsStyles.ingredients__scrolled}>
          {ingredients?.map((element: BurgerIngredientType, index: number) =>
            <BurgerConstructorElement key={element.id} index={index} element={element} main={false} onDropHandler={onDropHandler}/>
          )}
        </div>
        {isMainBun && (
          <BurgerConstructorElement element={mainBun} main position='bottom' onDropHandler={onDropHandler}/>
        )}
        </>
       )}
      </div>
  )
}
