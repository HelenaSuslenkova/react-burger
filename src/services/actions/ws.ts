import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_CONNECTION_START,
  WS_SEND_MESSAGE,
} from '../action-types/ws';

export interface IWSConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
}
export interface IWSConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
  readonly payload: Event;
}
export interface IWSConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload: Event;
}
export interface IWSConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
}
export interface IWSGetMessage {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: any;
}

export type TWSActions =
  | IWSConnectionStart
  | IWSConnectionSuccess
  | IWSConnectionError
  | IWSConnectionClosed
  | IWSGetMessage;

export const wsConnectionStart = (): IWSConnectionStart => ({
  type: WS_CONNECTION_START,
});

export const wsConnectionSuccess = (payload: Event): IWSConnectionSuccess => ({
  type: WS_CONNECTION_SUCCESS,
  payload,
});

export const wsConnectionError = (payload: Event): IWSConnectionError => ({
  type: WS_CONNECTION_ERROR,
  payload,
});

export const wsConnectionClosed = (payload: Event): IWSConnectionClosed => ({
  type: WS_CONNECTION_CLOSED,
});

export const wsGetMessage = (payload: any): IWSGetMessage => ({
  type: WS_GET_MESSAGE,
  payload,
});
