import PropTypes from 'prop-types';
import BurgerConstructorElement from './burger-constructor-element/burger-constructor-element';
import burgerConstructorElementsStyles from './burger-constructor-elements.module.css';
import { burgerIngredientType } from '../../../utils/types';

const BurgerConstructorElements = ({ mainBurgerElement, burgerIngredients }) => {

  return (
    <div className={burgerConstructorElementsStyles.ingredients}>
      <BurgerConstructorElement element={mainBurgerElement} main position='top' />
      <div className={burgerConstructorElementsStyles.ingredients__scrolled}>
        {burgerIngredients?.map((element, index) =>
          <BurgerConstructorElement key={element._id} index={index} element={element} main={false} />
        )}
      </div>
      <BurgerConstructorElement element={mainBurgerElement} main position='bottom' />
    </div>
  )
}

BurgerConstructorElements.propTypes = {
  mainBurgerElement: burgerIngredientType,
  burgerIngredients: PropTypes.arrayOf(
    burgerIngredientType,
  ).isRequired,
};

export default BurgerConstructorElements;
