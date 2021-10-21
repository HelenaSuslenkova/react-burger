import PropTypes from 'prop-types';
import BurgerConstructorElement from './burger-constructor-element/burger-constructor-element';
import burgerConstructorElementsStyles from './burger-constructor-elements.module.css';
import { burgerIngredientType } from '../../../utils/types';

const BurgerConstructorElements = ({ mainBun, ingredients }) => {
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

BurgerConstructorElements.propTypes = {
  mainBun: burgerIngredientType,
  ingredients: PropTypes.arrayOf(burgerIngredientType),
};

export default BurgerConstructorElements;
