import {
  GET_ORDER_DETAILS_REQUEST,
  GET_ORDER_DETAILS_SUCCESS,
  GET_ORDER_DETAILS_ERROR
} from '../action-types/burger-constructor-summary';

const initialState = {
  orderDetails: {
    data: {},
    orderDetailsRequest: false,
    orderDetailsError: false,
    error: null,
  }
};

export const burgerConstructorSummaryReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_ORDER_DETAILS_REQUEST: {
      return {
        ...state,
        orderDetails: {
          orderDetailsRequest: true,
        }
      }
    }
    case GET_ORDER_DETAILS_SUCCESS: {
      return {
        ...state,
        orderDetails: {
          data: action.payload,
          orderDetailsRequest: false,
        }
      }
    }
    case GET_ORDER_DETAILS_ERROR: {
      return {
        ...state,
        orderDetails: {
          orderDetailsRequest: false,
          orderDetailsError: true,
          error: action.error,
        }
      }
    }
    default: {
      return state;
    }
  }
}
