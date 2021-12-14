import { API_URL } from "../../api/settings";
import { BurgerIngredientType } from '../../utils/types';
import {
  GET_BURGER_INGREDIENTS_REQUEST,
  GET_BURGER_INGREDIENTS_SUCCESS,
  GET_BURGER_INGREDIENTS_ERROR,
} from '../action-types/burger-ingredients';

export const requestBurgerIngredients = () => ({
  type: GET_BURGER_INGREDIENTS_REQUEST
});

export const successBurgerIngredients = (data: Array<BurgerIngredientType>) => ({
  type: GET_BURGER_INGREDIENTS_SUCCESS,
  payload: data,
});

export const errorBurgerIngredients = (error: string) => ({
  type: GET_BURGER_INGREDIENTS_ERROR,
  error
});

export function getBurgerIngredients() {
  return function(dispatch: any) {
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
      .catch((error: { message: string }) => {
        dispatch(errorBurgerIngredients(error.message));
      });
    }
};
