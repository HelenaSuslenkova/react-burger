import {
  GET_ORDER_DETAILS_REQUEST,
  GET_ORDER_DETAILS_SUCCESS,
  GET_ORDER_DETAILS_ERROR,
} from "../action-types/burger-constructor-summary";
import { burgerConstructorSummaryReducer } from "./burger-constructor-summary";

let state;

const mockOrder = {
  name: 'test order',
  order: {
    number: 42,
  },
  success: true,
};

describe("burger constructor summary reducer", () => {
  it("must be acting GET_ORDER_DETAILS_REQUEST correctly", () => {
    state = burgerConstructorSummaryReducer(
      {
        orderDetails: {
          data: {
            name: "",
            order: {
              number: 0,
            },
            success: false,
          },
          orderDetailsRequest: false,
          orderDetailsError: false,
          error: null,
        },
      },
      {
        type: GET_ORDER_DETAILS_REQUEST,
      }
    );

    expect(state).toEqual({
      orderDetails: {
        data: {
          name: "",
          order: {
            number: 0,
          },
          success: false,
        },
        orderDetailsRequest: true,
        orderDetailsError: false,
        error: null,
      },
    });
  });
  it("must be acting GET_ORDER_DETAILS_SUCCESS correctly", () => {
    state = burgerConstructorSummaryReducer(
      {
        orderDetails: {
          data: {
            name: "",
            order: {
              number: 0,
            },
            success: false,
          },
          orderDetailsRequest: false,
          orderDetailsError: false,
          error: null,
        },
      },
      {
        type: GET_ORDER_DETAILS_SUCCESS,
        payload: mockOrder,
      }
    );

    expect(state).toEqual({
      orderDetails: {
        data: {
          name: 'test order',
          order: {
            number: 42,
          },
          success: true,
        },
        orderDetailsRequest: false,
        orderDetailsError: false,
        error: null,
      },
    });
  });
  it("must be acting GET_ORDER_DETAILS_ERROR correctly", () => {
    state = burgerConstructorSummaryReducer(
      {
        orderDetails: {
          data: {
            name: "",
            order: {
              number: 0,
            },
            success: false,
          },
          orderDetailsRequest: false,
          orderDetailsError: false,
          error: null,
        },
      },
      {
        type: GET_ORDER_DETAILS_ERROR,
        error: 'ErrorRequest',
      }
    );

    expect(state).toEqual({
      orderDetails: {
        data: {
          name: "",
          order: {
            number: 0,
          },
          success: false,
        },
        orderDetailsRequest: false,
        orderDetailsError: true,
        error: 'ErrorRequest',
      },
    });
  });
});
