import { useRef, useCallback, FC } from 'react';
import { useDrag, useDrop } from "react-dnd";
import { useDispatch, useSelector } from '../../../../services/types/hooks';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorElementStyles from './burger-constructor-element.module.css';
import { BUN_POSITIONS, DRAGGABLE_TYPES } from '../../../../utils/const';
import { BurgerIngredientType } from '../../../../utils/types';
import { deleteBurgerElement, updateBurgerElements } from '../../../../services/actions/burger-constructor-elements';
import burgerConstructorElementsSelector from '../../../../services/selectors/burger-constructor-elements';
import { LegacyRef } from 'react-dom/node_modules/@types/react';

type BurgerConstructorElementProps = {
  main: boolean;
  index?: number;
  element: BurgerIngredientType;
  position?: 'top' | 'bottom';
  onDropHandler: (item: BurgerIngredientType) => void
}

type DrugItem = {
  elementId: string;
  index: number;
}

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = ({ element, index, main, position }): JSX.Element => {
  const ref = useRef<HTMLElement>(null);
  const dispatch = useDispatch();
  const isLocked = main;
  const elementId = element.id;
  const ingridientName = (position === 'top' && `${element?.name} (${BUN_POSITIONS.top})`) || (position === 'bottom' && `${element?.name} (${BUN_POSITIONS.bottom})`) || element?.name;
  const elements = useSelector(burgerConstructorElementsSelector.elements);

  const deleteConstructorElement = () => {
    dispatch(deleteBurgerElement(elementId!));
  }

  const moveConstructorElement = useCallback((dragIndex: number, hoverIndex: number): void => {
    dispatch(updateBurgerElements({dragIndex, hoverIndex}));
  }, [elements]);

  const [, drop] = useDrop({
    accept: DRAGGABLE_TYPES.constructorElement,
    hover(item: DrugItem, monitor) {
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
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex! && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex! && hoverClientY > hoverMiddleY) {
        return;
      }
      moveConstructorElement(dragIndex, hoverIndex!);
      item.index = hoverIndex!;
    },
  });

  const [, drag] = useDrag({
    type: DRAGGABLE_TYPES.constructorElement,
    item: () => {
      return { elementId, index };
  },
  });

  return (
    <div ref={!isLocked ? drag(drop(ref)) as LegacyRef<HTMLDivElement> : null} className={burgerConstructorElementStyles.container}>
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
