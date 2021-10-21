import PropTypes from 'prop-types';
import {
  ConstructorElement,
  DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorElementStyles from './burger-constructor-element.module.css';
import { BUN_POSITIONS } from '../../../../utils/const';
import { burgerIngredientType } from '../../../../utils/types';

const BurgerConstructorElement = ({ element, main, position }) => {
  const isLocked = main;
  const ingridientName = (position === 'top' && `${element?.name} (${BUN_POSITIONS.top})`) || (position === 'bottom' && `${element?.name} (${BUN_POSITIONS.bottom})`) || element?.name;

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
          price={element?.price}
          thumbnail={element?.image}
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
