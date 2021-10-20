import { useContext, useMemo } from 'react';
import BurgerConstructorElement from './burger-constructor-element/burger-constructor-element';
import burgerConstructorElementsStyles from './burger-constructor-elements.module.css';
import { MainBunContext, IngredientsContext } from '../../../services/dataContext';

const BurgerConstructorElements = () => {
  const { mainBun } = useContext(MainBunContext);
  const { ingredients } = useContext(IngredientsContext);

  return (
    <div className={burgerConstructorElementsStyles.ingredients}>
      <BurgerConstructorElement element={mainBun} main position='top' />
      <div className={burgerConstructorElementsStyles.ingredients__scrolled}>
        {ingredients?.map((element, index) =>
          <BurgerConstructorElement key={element._id} index={index} element={element} main={false} />
        )}
      </div>
      <BurgerConstructorElement element={mainBun} main position='bottom' />
    </div>
  )
}

export default BurgerConstructorElements;
