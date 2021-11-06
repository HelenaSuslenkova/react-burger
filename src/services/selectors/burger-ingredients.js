export const burgerIngredientsSelector = {
  data: (state) => state.burgerIngredients.data,
  error: (state) => state.burgerIngredients.error,
  burgerIngredientsRequest: (state) => state.burgerIngredients.burgerIngredientsRequest,
  burgerIngredientsError: (state) => state.burgerIngredients.burgerIngredientsError,
}

export default burgerIngredientsSelector;
