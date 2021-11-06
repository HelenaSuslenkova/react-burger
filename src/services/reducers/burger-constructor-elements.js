import {
  SET_BURGER_MAIN_BUN,
  SET_BURGER_ELEMENTS,
  UPDATE_BURGER_ELEMENTS,
  DELETE_BURGER_ELEMENT,
} from '../action-types/burger-constructor-elements';

const initialState = {
  mainBun: {},
  elements: [],
};

export const burgerConstructorElementsReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_BURGER_MAIN_BUN: {
      return {
        ...state,
        mainBun: action.payload,
      }
    }
    case SET_BURGER_ELEMENTS: {
      return {
        ...state,
        elements: [
          ...state.elements,
          action.payload,
        ]
      }
    }
    case DELETE_BURGER_ELEMENT: {
      return {
        ...state,
        elements: state.elements.filter((element) => (element.id !== action.payload)),
      }
    }
    case UPDATE_BURGER_ELEMENTS: {

      return {
        ...state,
        elements: [
          ...sortElements(state.elements, action.payload.hoverIndex, action.payload.dragIndex),
        ],
        }
    }
    default: {
      return state;
    }
  }
}

function sortElements(elements, firstIndex, secondIndex) {
  const newElements = [...elements];
  newElements.splice(firstIndex, 0, newElements.splice(secondIndex, 1)[0]);

  return newElements;
}
