import {
  SET_BURGER_MAIN_BUN,
  SET_BURGER_ELEMENTS,
  UPDATE_BURGER_ELEMENTS,
  DELETE_BURGER_ELEMENT,
  DELETE_ALL_CONSTRUCTOR_ELEMENTS,
} from '../action-types/burger-constructor-elements';
import { BurgerIngredientType } from '../../utils/types';

export type UpdateBurgerElementsData = {
  dragIndex: number,
  hoverIndex: number,
}

export type BurgerIngredientTypeData = BurgerIngredientType & {id: string}
export interface ISetBurgerMainBun {
  readonly type: typeof SET_BURGER_MAIN_BUN;
  readonly payload: BurgerIngredientType;
}
export interface ISetBurgerElements {
  readonly type: typeof SET_BURGER_ELEMENTS;
  readonly payload: BurgerIngredientTypeData;
}
export interface IUpdateBurgerElements {
  readonly type: typeof UPDATE_BURGER_ELEMENTS;
  readonly payload: UpdateBurgerElementsData;
}
export interface IDeleteBurgerElement {
  readonly type: typeof DELETE_BURGER_ELEMENT;
  readonly payload: string;
}
export interface IDeleteAllConstructorElements {
  readonly type: typeof DELETE_ALL_CONSTRUCTOR_ELEMENTS;
}

export type TBurgerConstructorElementsActions =
  | ISetBurgerMainBun
  | ISetBurgerElements
  | IUpdateBurgerElements
  | IDeleteBurgerElement
  | IDeleteAllConstructorElements;

export const setBurgerMainBun = (data: BurgerIngredientType) : ISetBurgerMainBun => ({
  type: SET_BURGER_MAIN_BUN,
  payload: data,
});

export const setBurgerElements = (data: BurgerIngredientTypeData) : ISetBurgerElements => {
  return {
    type: SET_BURGER_ELEMENTS,
    payload: data
  }
}

export const updateBurgerElements = (data: UpdateBurgerElementsData) : IUpdateBurgerElements => ({
  type: UPDATE_BURGER_ELEMENTS,
  payload: data,
});

export const deleteBurgerElement = (elementId: string) : IDeleteBurgerElement => ({
  type: DELETE_BURGER_ELEMENT,
  payload: elementId,
});

export const deleteAllConstructorElements = () : IDeleteAllConstructorElements => ({
  type: DELETE_ALL_CONSTRUCTOR_ELEMENTS,
});
