import {
  SET_BURGER_MAIN_BUN,
  SET_BURGER_ELEMENTS,
  UPDATE_BURGER_ELEMENTS,
  DELETE_BURGER_ELEMENT,
} from '../action-types/burger-constructor-elements';

export const setBurgerMainBun = (data) => ({
  type: SET_BURGER_MAIN_BUN,
  payload: data,
});

export const setBurgerElements = (data) => {
  const payload = {
    ...data,
    id: Math.random().toString(36),
  }

  return {
    type: SET_BURGER_ELEMENTS,
    payload,
  }
}


export const updateBurgerElements = (data) => ({
  type: UPDATE_BURGER_ELEMENTS,
  payload: data,
});

export const deleteBurgerElement = (elementId) => ({
  type: DELETE_BURGER_ELEMENT,
  payload: elementId,
});
