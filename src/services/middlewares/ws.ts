import { Middleware, MiddlewareAPI } from "redux";
import { RootState, AppDispatch, TApplicationActions } from "../types/store";
import {
  wsConnectionSuccess,
  wsConnectionError,
  wsGetMessage,
} from "../actions/ws";

export const wsMiddleware = (wsUrl: string): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action: TApplicationActions) => {
      const { dispatch } = store;
      const { type } = action;

      if (type === "@WS/CONNECTION_START") {
        const path: string = action.payload;
        const url: string = `${wsUrl}${path}`;

        socket = new WebSocket(url);
        console.log("WS_CONNECTION_START", { socket });
      }
      if (type === "@WS/CONNECTION_CLOSED" && socket?.readyState === 1) {
        socket?.close();
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch(wsConnectionSuccess(event));
        };
        socket.onerror = (event) => {
          dispatch(wsConnectionError(event));
          console.log("WS_CONNECTION_ERROR", { event });
        };
        socket.onmessage = (event) => {
          const { data } = event;
          dispatch(wsGetMessage(JSON.parse(data)));
        };
        socket.onclose = (event) => {
          console.log("WS_CONNECTION_CLOSED", { event });
        };
      }
      next(action);
    };
  }) as Middleware;
};
