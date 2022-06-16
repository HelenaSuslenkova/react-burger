import { Middleware, MiddlewareAPI } from "redux";
import { RootState, AppDispatch, TApplicationActions } from "../types/store";
import {
  wsConnectionSuccess,
  wsConnectionError,
  wsGetData,
} from "../actions/ws";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
} from '../action-types/ws';

export const wsMiddleware = (wsUrl: string): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action: TApplicationActions) => {
      const { dispatch } = store;
      const { type } = action;

      if (type === WS_CONNECTION_START) {
        const path: string = action.payload;
        const url: string = `${wsUrl}${path}`;

        socket = new WebSocket(url);
      }
      if (type === WS_CONNECTION_CLOSED && socket?.readyState === 1) {
        socket?.close();
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch(wsConnectionSuccess(event));
        };
        socket.onerror = (event) => {
          dispatch(wsConnectionError(event));
        };
        socket.onmessage = (event) => {
          const { data } = event;
          dispatch(wsGetData(JSON.parse(data)));
        };
      }
      next(action);
    };
  }) as Middleware;
};
