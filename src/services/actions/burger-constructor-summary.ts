import { API_URL } from "../../api/settings";
import {
  GET_ORDER_DETAILS_REQUEST,
  GET_ORDER_DETAILS_SUCCESS,
  GET_ORDER_DETAILS_ERROR
} from '../action-types/burger-constructor-summary';
import { OrderDetailsType } from '../../utils/types';
import { AppThunk, AppDispatch } from '../types/store'
import { deleteAllConstructorElements } from '../actions/burger-constructor-elements';
export interface IRequestOrderDetails {
  readonly type: typeof GET_ORDER_DETAILS_REQUEST;
}
export interface ISuccessOrderDetails {
  readonly type: typeof GET_ORDER_DETAILS_SUCCESS;
  readonly payload: OrderDetailsType;
}
export interface IErrorOrderDetails {
  readonly type: typeof GET_ORDER_DETAILS_ERROR;
  readonly error: string;
}

export type TBurgerConstructorSummaryActions =
  | IRequestOrderDetails
  | ISuccessOrderDetails
  | IErrorOrderDetails;

export const requestOrderDetails = (): IRequestOrderDetails => ({
  type: GET_ORDER_DETAILS_REQUEST
});

export const successOrderDetails = (data: OrderDetailsType): ISuccessOrderDetails => ({
  type: GET_ORDER_DETAILS_SUCCESS,
  payload: data,
});

export const errorOrderDetails = (error: string): IErrorOrderDetails => ({
  type: GET_ORDER_DETAILS_ERROR,
  error
});

export const getOrderDetails: AppThunk = (ingredientIds: Array<string>) => (dispatch: AppDispatch) => {
  dispatch(requestOrderDetails());

  const body = {
    ingredients: ingredientIds,
  }

  const URL = `${API_URL}/orders`;

  fetch(URL, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      'Authorization': `${localStorage.getItem('accessToken')}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        dispatch(errorOrderDetails(`Response status: ${response.status}`));
      }

      return response.json();
    })
    .then((data: OrderDetailsType) => {
      dispatch(successOrderDetails(data));
      dispatch(deleteAllConstructorElements());
    })
    .catch((error: { message: string }) => {
      dispatch(errorOrderDetails(error.message));
    });
};
