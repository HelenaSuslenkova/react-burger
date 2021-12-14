import {
  SET_BURGER_MAIN_BUN,
  SET_BURGER_ELEMENTS,
  UPDATE_BURGER_ELEMENTS,
  DELETE_BURGER_ELEMENT,
  DELETE_ALL_CONSTRUCTOR_ELEMENTS,
} from '../action-types/burger-constructor-elements';
import { BurgerIngredientType } from '../../utils/types';

export const setBurgerMainBun = (data: BurgerIngredientType) => ({
  type: SET_BURGER_MAIN_BUN,
  payload: data,
});

export const setBurgerElements = (data: BurgerIngredientType) => {
  const payload = {
    ...data,
    id: Math.random().toString(36),
  }

  return {
    type: SET_BURGER_ELEMENTS,
    payload,
  }
}


export const updateBurgerElements = (data: {dragIndex: number, hoverIndex: number}) => ({
  type: UPDATE_BURGER_ELEMENTS,
  payload: data,
});

export const deleteBurgerElement = (elementId: string) => ({
  type: DELETE_BURGER_ELEMENT,
  payload: elementId,
});

export const deleteAllConstructorElements = () => ({
  type: DELETE_ALL_CONSTRUCTOR_ELEMENTS,
});
