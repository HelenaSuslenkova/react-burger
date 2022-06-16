import { API_URL } from "../../api/settings";
import { BurgerIngredientType } from "../../utils/types";
import {
  GET_BURGER_INGREDIENTS_REQUEST,
  GET_BURGER_INGREDIENTS_SUCCESS,
  GET_BURGER_INGREDIENTS_ERROR,
} from "../action-types/burger-ingredients";
import { AppThunk, AppDispatch } from "../types/store";
export interface IRequestBurgerIngredients {
  readonly type: typeof GET_BURGER_INGREDIENTS_REQUEST;
}
export interface ISuccessBurgerIngredients {
  readonly type: typeof GET_BURGER_INGREDIENTS_SUCCESS;
  readonly payload: Array<BurgerIngredientType>;
}
export interface IErrorBurgerIngredients {
  readonly type: typeof GET_BURGER_INGREDIENTS_ERROR;
  readonly error: string;
}

export type TBurgerIngredientsActions =
  | IRequestBurgerIngredients
  | ISuccessBurgerIngredients
  | IErrorBurgerIngredients;

export const requestBurgerIngredients = (): IRequestBurgerIngredients => ({
  type: GET_BURGER_INGREDIENTS_REQUEST,
});

export const successBurgerIngredients = (
  data: Array<BurgerIngredientType>
): ISuccessBurgerIngredients => ({
  type: GET_BURGER_INGREDIENTS_SUCCESS,
  payload: data,
});

export const errorBurgerIngredients = (
  error: string
): IErrorBurgerIngredients => ({
  type: GET_BURGER_INGREDIENTS_ERROR,
  error,
});

export const getBurgerIngredients: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch(requestBurgerIngredients());
  const URL = `${API_URL}/ingredients`;

  fetch(URL)
    .then((response) => {
      if (!response.ok) {
        dispatch(errorBurgerIngredients(`Response status: ${response.status}`));
      }

      return response.json();
    })
    .then(({ data }) => {
      dispatch(successBurgerIngredients(data));
    })
    .catch((error: { message: string }) => {
      dispatch(errorBurgerIngredients(error.message));
    });
};
