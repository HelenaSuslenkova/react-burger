import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import {
  GET_BURGER_INGREDIENTS_REQUEST,
  GET_BURGER_INGREDIENTS_SUCCESS,
  GET_BURGER_INGREDIENTS_ERROR,
} from "../action-types/burger-ingredients";
import {
  requestBurgerIngredients,
  successBurgerIngredients,
  errorBurgerIngredients,
  getBurgerIngredients,
} from "./burger-ingredients";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mockBurgerIngredients = [{
  _id: "test_id",
  id: Math.random().toString(36),
  name: "test name",
  type: "test_type",
  proteins: 42,
  fat: 42,
  carbohydrates: 42,
  calories: 42,
  price: 42,
  image: "data:image/svg+xml;base64,TEST_IMAGE",
  image_mobile: "data:image/svg+xml;base64,TEST_IMAGE",
  image_large: "data:image/svg+xml;base64,TEST_IMAGE",
  __v: 42,
}];

describe("Burger ingredients actions", () => {
  describe("Burger ingredients actions creators", () => {
    it("creates request action correctly", () => {
      expect(requestBurgerIngredients()).toEqual({
        type: GET_BURGER_INGREDIENTS_REQUEST,
      });
    });

    it("creates error action correctly", () => {
      expect(errorBurgerIngredients("test error message")).toEqual({
        type: GET_BURGER_INGREDIENTS_ERROR,
        error: "test error message",
      });
    });

    it("creates success action correctly", () => {
      expect(successBurgerIngredients(mockBurgerIngredients)).toEqual({
        type: GET_BURGER_INGREDIENTS_SUCCESS,
        payload: mockBurgerIngredients,
      });
    });
  });

  describe.skip("Get Burger Ingredients thunk", () => {
    beforeEach(() => {
      jest.spyOn(global, 'fetch')
        .mockResolvedValue({
          json: jest.fn().mockResolvedValue(mockBurgerIngredients),
          ok: true,
        })
    });

    it("fetches order details", () => {
      const expectedActions = [
        requestBurgerIngredients(),
        successBurgerIngredients(mockBurgerIngredients),
      ];

      const store = mockStore({});

      return expect(
        store.dispatch(getBurgerIngredients()).then(() => store.getActions())
      ).resolves.toEqual(expectedActions);
    });
  });
});
