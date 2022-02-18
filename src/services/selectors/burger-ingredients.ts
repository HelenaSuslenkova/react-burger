import { RootState } from '../../services/types/store';

export const burgerIngredientsSelector = {
  data: (state: RootState) => state.burgerIngredients.data,
  error: (state: RootState) => state.burgerIngredients.error,
  burgerIngredientsRequest: (state: RootState) => state.burgerIngredients.burgerIngredientsRequest,
  burgerIngredientsError: (state: RootState) => state.burgerIngredients.burgerIngredientsError,
}

export default burgerIngredientsSelector;
