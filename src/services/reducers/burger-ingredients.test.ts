import {
  GET_BURGER_INGREDIENTS_REQUEST,
  GET_BURGER_INGREDIENTS_SUCCESS,
  GET_BURGER_INGREDIENTS_ERROR,
} from "../action-types/burger-ingredients";
import { burgerIngredientsReducer } from "./burger-ingredients";

const mockData = [
  {
    _id: "60d3b41abdacab0026a733c6",
    name: "Краторная булка N-200i",
    type: "bun",
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    __v: 0,
  },
];
let state;

describe("burger ingredients reducer", () => {
  it("must be acting GET_BURGER_INGREDIENTS_REQUEST correctly", () => {
    state = burgerIngredientsReducer(
      {
        data: [],
        burgerIngredientsRequest: false,
        burgerIngredientsError: false,
        error: null,
      },
      {
        type: GET_BURGER_INGREDIENTS_REQUEST,
      }
    );

    expect(state).toEqual({
      data: [],
        burgerIngredientsRequest: true,
        burgerIngredientsError: false,
        error: null,
    });
  });
  it("must be acting GET_BURGER_INGREDIENTS_SUCCESS correctly", () => {
    state = burgerIngredientsReducer(
      {
        data: [],
        burgerIngredientsRequest: true,
        burgerIngredientsError: false,
        error: null,
      },
      {
        type: GET_BURGER_INGREDIENTS_SUCCESS,
        payload: mockData,
      }
    );

    expect(state).toEqual({
      data: [
        {
          _id: "60d3b41abdacab0026a733c6",
          name: "Краторная булка N-200i",
          type: "bun",
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: "https://code.s3.yandex.net/react/code/bun-02.png",
          image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
          image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
          __v: 0,
        },
      ],
      burgerIngredientsRequest: false,
      burgerIngredientsError: false,
      error: null,
    });
  });

  it("must be acting GET_BURGER_INGREDIENTS_ERROR correctly", () => {
    state = burgerIngredientsReducer(
      {
        data: [],
        burgerIngredientsRequest: false,
        burgerIngredientsError: false,
        error: null,
      },
      {
        type: GET_BURGER_INGREDIENTS_ERROR,
        error: 'ErrorRequest'
      }
    );

    expect(state).toEqual({
      data: [],
        burgerIngredientsRequest: false,
        burgerIngredientsError: true,
        error: 'ErrorRequest',
    });
  });
});
