import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE
} from '../action-types/ws';
import { TWSActions } from '../actions/ws';

type TWSState = {
  isConnected: boolean;
  data: any;
  error?: Event;
}

const initialState: TWSState = {
  isConnected: false,
  data: [],
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
        isConnected: false
      };
    case WS_GET_MESSAGE:
      return {
        ...state,
        error: undefined,
        data: [...state.data, action.payload]
      };
    default:
      return state;
  }
};
