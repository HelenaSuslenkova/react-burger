import { API_URL } from "../../api/settings";
import {
  GET_ORDER_DETAILS_REQUEST,
  GET_ORDER_DETAILS_SUCCESS,
  GET_ORDER_DETAILS_ERROR
} from '../action-types/burger-constructor-summary';

export const requestOrderDetails = () => ({
  type: GET_ORDER_DETAILS_REQUEST
});
export const successOrderDetails = (data) => ({
  type: GET_ORDER_DETAILS_SUCCESS,
  payload: data,
});
export const errorOrderDetails = (error) => ({
  type: GET_ORDER_DETAILS_ERROR,
  error
});


export function getOrderDetails(ingredientIds) {
  return function(dispatch) {
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
    .then((data) => {
      dispatch(successOrderDetails(data));
    })
    .catch((error) => {
      dispatch(errorOrderDetails(error.message));
    });
  }
};
