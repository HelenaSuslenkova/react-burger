import { API_URL } from "../../api/settings";
import {
  GET_ORDER_DETAILS_REQUEST,
  GET_ORDER_DETAILS_SUCCESS,
  GET_ORDER_DETAILS_ERROR
} from '../action-types/burger-constructor-summary';
import { deleteAllConstructorElements } from '../actions/burger-constructor-elements';


type orderDetailsType = {
  name: string,
  order: {
    number: number,
  }
  success: boolean,
};

export const requestOrderDetails = () => ({
  type: GET_ORDER_DETAILS_REQUEST
});
export const successOrderDetails = (data: orderDetailsType) => ({
  type: GET_ORDER_DETAILS_SUCCESS,
  payload: data,
});
export const errorOrderDetails = (error: string) => ({
  type: GET_ORDER_DETAILS_ERROR,
  error
});


export function getOrderDetails(ingredientIds: Array<string>) {
  return function(dispatch: any) {
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
      },
    })
    .then((response) => {
      if (!response.ok) {
        dispatch(errorOrderDetails(`Response status: ${response.status}`));
      }

      return response.json();
    })
    .then((data: orderDetailsType) => {
      dispatch(successOrderDetails(data));
      dispatch(deleteAllConstructorElements());
    })
    .catch((error: { message: string }) => {
      dispatch(errorOrderDetails(error.message));
    });
  }
};
