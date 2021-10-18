import PropTypes from 'prop-types';
import {
  ConstructorElement,
  DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorElementStyles from './burger-constructor-element.module.css';
import { BULK_POSITIONS } from '../../../../utils/const';
import { burgerIngredientType } from '../../../../utils/types';

const BurgerConstructorElement = ({ element, main, position }) => {
  const { name, price, image } = element;
  const isLocked = main;
  const ingridientName = (position === 'top' && `${name} (${BULK_POSITIONS.top})`) || (position === 'bottom' && `${name} (${BULK_POSITIONS.bottom})`) || name;

  return (
    <div className={burgerConstructorElementStyles.container}>
      {!isLocked &&
        <DragIcon type="primary" />
      }
      <div className={burgerConstructorElementStyles.burgerElement}>
        <ConstructorElement
          type={position}
          isLocked={isLocked}
          text={ingridientName}
          price={price}
          thumbnail={image}
        />
      </div>
    </div>
  )
}
BurgerConstructorElement.propTypes = {
  element: burgerIngredientType,
  main: PropTypes.bool.isRequired,
  position: PropTypes.string,
}

export default BurgerConstructorElement;
