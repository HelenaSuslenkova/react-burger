import { combineReducers } from 'redux';
import { burgerIngredientsReducer } from './burger-ingredients'
import { burgerConstructorSummaryReducer } from './burger-constructor-summary';
import { burgerConstructorElementsReducer } from './burger-constructor-elements';

const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  burgerConstructorSummary: burgerConstructorSummaryReducer,
  burgerConstructorElements: burgerConstructorElementsReducer,
});

export default rootReducer;
