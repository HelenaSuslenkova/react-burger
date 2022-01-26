import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_DATA,
  WS_CONNECTION_START,
} from '../action-types/ws';
import { Feed } from '../../utils/types';

export interface IWSConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
  readonly payload: string;
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
  readonly type: typeof WS_GET_DATA;
  readonly payload: Feed;
}

export type TWSActions =
  | IWSConnectionStart
  | IWSConnectionSuccess
  | IWSConnectionError
  | IWSConnectionClosed
  | IWSGetMessage;

export const wsConnectionStart = (path: string): IWSConnectionStart => ({
  type: WS_CONNECTION_START,
  payload: path,
});

export const wsConnectionSuccess = (payload: Event): IWSConnectionSuccess => ({
  type: WS_CONNECTION_SUCCESS,
  payload,
});

export const wsConnectionError = (payload: Event): IWSConnectionError => ({
  type: WS_CONNECTION_ERROR,
  payload,
});

export const wsConnectionClosed = (): IWSConnectionClosed => ({
  type: WS_CONNECTION_CLOSED,
});

export const wsGetMessage = (payload: Feed): IWSGetMessage => ({
  type: WS_GET_DATA,
  payload,
});
