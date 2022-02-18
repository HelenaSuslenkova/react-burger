import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_DATA,
} from '../action-types/ws';
import { TWSActions } from '../actions/ws';
import { Feed } from '../../utils/types';

type TWSState = {
  isConnected: boolean;
  data: Feed;
  error?: Event;
}

const initialState: TWSState = {
  isConnected: false,
  data: {
    orders: [],
    success: false,
    total: 0,
    totalToday: 0,
  },
};

export const wsReducer = (state = initialState, action: TWSActions) : TWSState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        isConnected: true
      };
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        isConnected: false
      };
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        isConnected: false,
        data: initialState.data,
      };
    case WS_GET_DATA:
      return {
        ...state,
        error: undefined,
        data: action.payload,
      };
    default:
      return state;
  }
};
