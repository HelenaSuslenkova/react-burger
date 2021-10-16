import PropTypes from 'prop-types';
import BurgerConstructorElement from './burger-constructor-element/burger-constructor-element';
import burgerConstructorElementsStyles from "./burger-constructor-elements.module.css";

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
  mainBurgerElement: PropTypes.shape({
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
  burgerIngredients: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ).isRequired,
};

export default BurgerConstructorElements;
