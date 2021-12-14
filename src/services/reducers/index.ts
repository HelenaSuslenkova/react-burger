import { combineReducers } from 'redux';
import { burgerIngredientsReducer } from './burger-ingredients'
import { burgerConstructorSummaryReducer } from './burger-constructor-summary';
import { burgerConstructorElementsReducer } from './burger-constructor-elements';
import { userDetailsReducer } from './user-details';

const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  burgerConstructorSummary: burgerConstructorSummaryReducer,
  burgerConstructorElements: burgerConstructorElementsReducer,
  userDetails: userDetailsReducer,
});

export default rootReducer;
