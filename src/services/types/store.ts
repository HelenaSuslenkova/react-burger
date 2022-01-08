import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { configureStore } from '../store';
import { TUserDetailsActions } from '../actions/user-details';
import { TBurgerIngredientsActions } from '../actions/burger-ingredients';
import { TBurgerConstructorSummaryActions } from '../actions/burger-constructor-summary';
import { TBurgerConstructorElementsActions } from '../actions/burger-constructor-elements';

const store = configureStore({});

type TApplicationActions =
  TUserDetailsActions |
  TBurgerIngredientsActions |
  TBurgerConstructorSummaryActions |
  TBurgerConstructorElementsActions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;
