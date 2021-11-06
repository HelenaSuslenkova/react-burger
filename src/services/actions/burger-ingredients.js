import { API_URL } from "../../api/settings";
import {
  GET_BURGER_INGREDIENTS_REQUEST,
  GET_BURGER_INGREDIENTS_SUCCESS,
  GET_BURGER_INGREDIENTS_ERROR,
} from '../action-types/burger-ingredients';

export const requestBurgerIngredients = () => ({
  type: GET_BURGER_INGREDIENTS_REQUEST
});

export const successBurgerIngredients = (data) => ({
  type: GET_BURGER_INGREDIENTS_SUCCESS,
  payload: data,
});

export const errorBurgerIngredients = (error) => ({
  type: GET_BURGER_INGREDIENTS_ERROR,
  error
});

export function getBurgerIngredients() {
  return function(dispatch) {
    dispatch(requestBurgerIngredients());
    const URL = `${API_URL}/ingredients`;

    fetch(URL)
      .then((response) => {
        if (!response.ok) {
          dispatch(errorBurgerIngredients(`Response status: ${response.status}`));
        }

        return response.json()
      })
      .then(({ data }) => {
          dispatch(successBurgerIngredients(data));
      })
      .catch((error) => {
        dispatch(errorBurgerIngredients(error.message));
      });
    }
};
