import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import {
  GET_ORDER_DETAILS_REQUEST,
  GET_ORDER_DETAILS_SUCCESS,
  GET_ORDER_DETAILS_ERROR,
} from "../action-types/burger-constructor-summary";
import {
  requestOrderDetails,
  successOrderDetails,
  errorOrderDetails,
  getOrderDetails,
} from "./burger-constructor-summary";
import { deleteAllConstructorElements } from "./burger-constructor-elements";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mockOrderDetail = {
  name: "test name",
  order: {
    number: 42,
  },
  success: true,
};

describe("Burger constructor summary actions", () => {
  describe("Burger constructor summary actions creators", () => {
    it("creates request action correctly", () => {
      expect(requestOrderDetails()).toEqual({
        type: GET_ORDER_DETAILS_REQUEST,
      });
    });

    it("creates error action correctly", () => {
      expect(errorOrderDetails("test error message")).toEqual({
        type: GET_ORDER_DETAILS_ERROR,
        error: "test error message",
      });
    });

    it("creates success action correctly", () => {
      expect(successOrderDetails(mockOrderDetail)).toEqual({
        type: GET_ORDER_DETAILS_SUCCESS,
        payload: mockOrderDetail,
      });
    });
  });

  describe("Get order details thunk", () => {
    beforeEach(() => {
      jest.spyOn(global, 'fetch')
        .mockResolvedValue({
          json: jest.fn().mockResolvedValue(mockOrderDetail),
          ok: true,
        })
    });

    it("fetches order details", () => {
      const ingredientIds = ['testid1', 'testid2'];

      const expectedActions = [
        requestOrderDetails(),
        successOrderDetails(mockOrderDetail),
        deleteAllConstructorElements(),
      ];

      const store = mockStore({});

      return expect(
        store.dispatch(getOrderDetails(ingredientIds)).then(() => store.getActions())
      ).resolves.toEqual(expectedActions);
    });
  });
});
