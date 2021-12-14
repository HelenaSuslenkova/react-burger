export const burgerIngredientsSelector = {
  data: (state: any) => state.burgerIngredients.data,
  error: (state: any) => state.burgerIngredients.error,
  burgerIngredientsRequest: (state: any) => state.burgerIngredients.burgerIngredientsRequest,
  burgerIngredientsError: (state: any) => state.burgerIngredients.burgerIngredientsError,
}

export default burgerIngredientsSelector;
