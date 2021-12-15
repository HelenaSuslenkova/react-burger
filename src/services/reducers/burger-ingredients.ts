import {
  GET_BURGER_INGREDIENTS_REQUEST,
  GET_BURGER_INGREDIENTS_SUCCESS,
  GET_BURGER_INGREDIENTS_ERROR,
} from '../action-types/burger-ingredients';

const initialState = {
  data: [],
  burgerIngredientsRequest: false,
  burgerIngredientsError: false,
  error: null,
};

export const burgerIngredientsReducer = (state = initialState, action: any) => {
  switch(action.type) {
    case GET_BURGER_INGREDIENTS_REQUEST: {
      return {
        ...state,
        burgerIngredientsRequest: true,
      }
    }
    case GET_BURGER_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        burgerIngredientsRequest: false,
      }
    }
    case GET_BURGER_INGREDIENTS_ERROR: {
      return {
        ...state,
        burgerIngredientsRequest: false,
        burgerIngredientsError: true,
        error: action.error,
      }
    }
    default: {
      return state;
    }
  }
}
