import {
  SET_BURGER_MAIN_BUN,
  SET_BURGER_ELEMENTS,
  UPDATE_BURGER_ELEMENTS,
  DELETE_BURGER_ELEMENT,
  DELETE_ALL_CONSTRUCTOR_ELEMENTS,
} from "../action-types/burger-constructor-elements";
import { BurgerIngredientType } from "../../utils/types";
import { TBurgerConstructorElementsActions } from "../actions/burger-constructor-elements";

type TBurgerConstructorElementsState = {
  mainBun: BurgerIngredientType | null;
  elements: Array<BurgerIngredientType>;
};

const initialState: TBurgerConstructorElementsState = {
  mainBun: null,
  elements: [],
};

export const sortElements = (
  elements: Array<BurgerIngredientType>,
  firstIndex: number,
  secondIndex: number
) => {
  const newElements = [...elements];
  newElements.splice(firstIndex, 0, newElements.splice(secondIndex, 1)[0]);

  return newElements;
};

export const burgerConstructorElementsReducer = (
  state = initialState,
  action: TBurgerConstructorElementsActions
): TBurgerConstructorElementsState => {
  switch (action.type) {
    case SET_BURGER_MAIN_BUN: {
      return {
        ...state,
        mainBun: action.payload,
      };
    }
    case SET_BURGER_ELEMENTS: {
      return {
        ...state,
        elements: [...state.elements, action.payload],
      };
    }
    case DELETE_BURGER_ELEMENT: {
      return {
        ...state,
        elements: state.elements.filter(
          (element: BurgerIngredientType) => element.id !== action.payload
        ),
      };
    }
    case UPDATE_BURGER_ELEMENTS: {
      return {
        ...state,
        elements: [
          ...sortElements(
            state.elements,
            action.payload.hoverIndex,
            action.payload.dragIndex
          ),
        ],
      };
    }
    case DELETE_ALL_CONSTRUCTOR_ELEMENTS: {
      return {
        ...state,
        elements: initialState.elements,
        mainBun: initialState.mainBun,
      };
    }
    default: {
      return state;
    }
  }
};
