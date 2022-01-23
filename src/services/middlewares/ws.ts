import { Middleware, MiddlewareAPI } from "redux";
import { RootState, AppDispatch, TApplicationActions } from '../types/store';
import {
    wsConnectionSuccess,
    wsConnectionError,
    wsGetMessage,
    wsConnectionClosed,
} from '../actions/ws';

export const wsMiddleware = (wsUrl: string): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return next => (action: TApplicationActions) => {
            const { dispatch, getState } = store;
            const { type } = action;

            if (type === '@WS/CONNECTION_START') {
                const accessToken = localStorage.getItem('accessToken');
                const cNewTestUrl = 'wss://norma.nomoreparties.space/orders/all'; /*`wss://norma.nomoreparties.space/orders?token=${accessToken}`;*/

                socket = new WebSocket(cNewTestUrl);
                console.log('WS_CONNECTION_START', { socket });
            }
            if (socket) {
                socket.onopen = event => {
                    dispatch(wsConnectionSuccess(event));
                };
                socket.onerror = event => {
                    dispatch(wsConnectionError(event));
                    console.log('WS_CONNECTION_ERROR', { event });
                };
                socket.onmessage = event => {
                    const { data } = event;
                    dispatch(wsGetMessage(data));
                };
                socket.onclose = event => {
                    dispatch(wsConnectionClosed(event));
                    console.log('WS_CONNECTION_CLOSED', { event });
                };
            }
            next(action);
        };
    }) as Middleware;
};
