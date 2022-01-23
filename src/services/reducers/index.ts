import { combineReducers } from 'redux';
import { burgerIngredientsReducer } from './burger-ingredients'
import { burgerConstructorSummaryReducer } from './burger-constructor-summary';
import { burgerConstructorElementsReducer } from './burger-constructor-elements';
import { userDetailsReducer } from './user-details';
import { wsReducer } from './ws';

const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  burgerConstructorSummary: burgerConstructorSummaryReducer,
  burgerConstructorElements: burgerConstructorElementsReducer,
  userDetails: userDetailsReducer,
  feedOrders: wsReducer,
});

export default rootReducer;
