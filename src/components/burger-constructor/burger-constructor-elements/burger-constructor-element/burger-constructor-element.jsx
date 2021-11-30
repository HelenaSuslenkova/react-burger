import PropTypes from 'prop-types';
import { useRef, useCallback } from 'react';
import { useDrag, useDrop } from "react-dnd";
import { useDispatch, useSelector } from 'react-redux';
import {
  ConstructorElement,
  DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorElementStyles from './burger-constructor-element.module.css';
import { BUN_POSITIONS } from '../../../../utils/const';
import { burgerIngredientType } from '../../../../utils/types';
import { deleteBurgerElement, updateBurgerElements } from '../../../../services/actions/burger-constructor-elements';
import { DRAGGABLE_TYPES } from '../../../../utils/const';
import burgerConstructorElementsSelector from '../../../../services/selectors/burger-constructor-elements';


const BurgerConstructorElement = ({ element, index, main, position }) => {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const isLocked = main;
  const elementId = element.id;
  const ingridientName = (position === 'top' && `${element?.name} (${BUN_POSITIONS.top})`) || (position === 'bottom' && `${element?.name} (${BUN_POSITIONS.bottom})`) || element?.name;
  const elements = useSelector(burgerConstructorElementsSelector.elements);

  const deleteConstructorElement = () => {
    dispatch(deleteBurgerElement(elementId));
  }

  const moveConstructorElement = useCallback((dragIndex, hoverIndex) => {
    dispatch(updateBurgerElements({dragIndex, hoverIndex}));
  }, [elements]);

  const [, drop] = useDrop({
      accept: DRAGGABLE_TYPES.constructorElement,
      hover(item, monitor) {
        if (!ref.current) {
            return;
        }
        const dragIndex = item.index;
        const hoverIndex = index;
        if (dragIndex === hoverIndex) {
            return;
        }
        const hoverBoundingRect = ref.current?.getBoundingClientRect();
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const clientOffset = monitor.getClientOffset();
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
        }
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
        }
        moveConstructorElement(dragIndex, hoverIndex);
        item.index = hoverIndex;
      },
  });

  const [, drag] = useDrag({
    type: DRAGGABLE_TYPES.constructorElement,
    item: () => {
      return { elementId, index };
  },
  });

  return (
    <div ref={!isLocked ? drag(drop(ref)) : null} className={burgerConstructorElementStyles.container}>
      {!isLocked &&
        <DragIcon type="primary" />
      }
      <div className={`${burgerConstructorElementStyles.burgerElement} ${!isLocked && burgerConstructorElementStyles.burgerElement__drugged}`}>
        <ConstructorElement
          type={position}
          isLocked={isLocked}
          text={ingridientName}
          price={element?.price}
          thumbnail={element?.image}
          handleClose={deleteConstructorElement}
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
