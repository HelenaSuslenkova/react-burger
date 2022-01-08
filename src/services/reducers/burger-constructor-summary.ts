import {
  GET_ORDER_DETAILS_REQUEST,
  GET_ORDER_DETAILS_SUCCESS,
  GET_ORDER_DETAILS_ERROR
} from '../action-types/burger-constructor-summary';
import { TBurgerConstructorSummaryActions } from '../actions/burger-constructor-summary';
import { OrderDetailsType } from '../../utils/types';

type TBurgerConstructorSummaryState = {
  orderDetails: {
    data: OrderDetailsType,
    orderDetailsRequest: boolean,
    orderDetailsError: boolean,
    error: string | null,
  }
}

const initialState: TBurgerConstructorSummaryState = {
  orderDetails: {
    data: {
      name: '',
      order: {
        number: 0,
      },
      success: false,
    },
    orderDetailsRequest: false,
    orderDetailsError: false,
    error: null,
  }
};

export const burgerConstructorSummaryReducer =
  (state = initialState, action: TBurgerConstructorSummaryActions) : TBurgerConstructorSummaryState => {
  switch (action.type) {
    case GET_ORDER_DETAILS_REQUEST: {
      return {
        ...state,
        orderDetails: {
          data: state.orderDetails.data,
          orderDetailsRequest: true,
          orderDetailsError: state.orderDetails.orderDetailsError,
          error: state.orderDetails.error,
        }
      }
    }
    case GET_ORDER_DETAILS_SUCCESS: {
      return {
        ...state,
        orderDetails: {
          data: action.payload,
          orderDetailsRequest: false,
          orderDetailsError: state.orderDetails.orderDetailsError,
          error: state.orderDetails.error,
        }
      }
    }
    case GET_ORDER_DETAILS_ERROR: {
      return {
        ...state,
        orderDetails: {
          data: state.orderDetails.data,
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
