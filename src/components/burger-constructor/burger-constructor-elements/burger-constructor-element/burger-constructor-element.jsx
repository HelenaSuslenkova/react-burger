import React from 'react';
import PropTypes from 'prop-types';
import {
  ConstructorElement,
  DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorElementStyles from "./burger-constructor-element.module.css";

const BurgerConstructorElement = ({ element, main, position }) => {
  const { name, price, image } = element;
  const isLocked = main;
  return (
    <div className={burgerConstructorElementStyles.container}>
      {!isLocked &&
        <DragIcon type="primary" />
      }
      <div className={burgerConstructorElementStyles.burgerElement}>
        <ConstructorElement
          type={position}
          isLocked={isLocked}
          text={name}
          price={price}
          thumbnail={image}
        />
      </div>
    </div>
  )
}
BurgerConstructorElement.propTypes = {
  element: PropTypes.shape({
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
  main: PropTypes.bool.isRequired,
  position: PropTypes.string,
}

export default BurgerConstructorElement;
