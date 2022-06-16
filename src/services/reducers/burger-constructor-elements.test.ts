import {
  SET_BURGER_MAIN_BUN,
  SET_BURGER_ELEMENTS,
  UPDATE_BURGER_ELEMENTS,
  DELETE_BURGER_ELEMENT,
  DELETE_ALL_CONSTRUCTOR_ELEMENTS,
} from "../action-types/burger-constructor-elements";
import { burgerConstructorElementsReducer } from "./burger-constructor-elements";

const mockMainBun = {
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
};

const mockElement_1 = {
  _id: "60d3b41abdacab0026a733c6",
  id: "asdk3b41abdacab0026a733c6",
  name: "Мясо бессмертных моллюсков Protostomia",
  type: "main",
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: "https://code.s3.yandex.net/react/code/meat-02.png",
  image_mobile: "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/meat-02-large.png",
  __v: 0,
};
const mockElement_2 = {
  _id: "60d3b41abdacab0026a733c6",
  id: "asdk3b41abdacab0026a733c6",
  name: "Говяжий метеорит (отбивная)",
  type: "main",
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: "https://code.s3.yandex.net/react/code/meat-02.png",
  image_mobile: "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/meat-02-large.png",
  __v: 0,
};
const mockUpdateBurgerElementsData = {
  dragIndex: 1,
  hoverIndex: 0,
};

const mockElementId = 'asdk3b41abdacab0026a733c6'

let state;

describe("burger constructor elements reducer", () => {
  it("must be acting SET_BURGER_MAIN_BUN correctly", () => {
    state = burgerConstructorElementsReducer(
      {
        mainBun: null,
        elements: [],
      },
      {
        type: SET_BURGER_MAIN_BUN,
        payload: mockMainBun,
      }
    );

    expect(state).toEqual({
      mainBun: mockMainBun,
      elements: [],
    });
  });
  it("must be acting SET_BURGER_ELEMENTS correctly", () => {
    state = burgerConstructorElementsReducer(
      {
        mainBun: null,
        elements: [],
      },
      {
        type: SET_BURGER_ELEMENTS,
        payload: mockElement_1,
      }
    );

    expect(state).toEqual({
      mainBun: null,
      elements: [
        mockElement_1
      ],
    });
  });
  it("must be acting UPDATE_BURGER_ELEMENTS correctly", () => {
    state = burgerConstructorElementsReducer(
      {
        mainBun: null,
        elements: [mockElement_1, mockElement_2],
      },
      {
        type: UPDATE_BURGER_ELEMENTS,
        payload: mockUpdateBurgerElementsData,
      }
    );

    expect(state).toEqual({
      mainBun: null,
      elements: [mockElement_2, mockElement_1],
    });
  });
  it("must be acting DELETE_BURGER_ELEMENT correctly", () => {
    state = burgerConstructorElementsReducer(
      {
        mainBun: null,
        elements: [mockElement_1],
      },
      {
        type: DELETE_BURGER_ELEMENT,
        payload: mockElementId,
      }
    );

    expect(state).toEqual({
      mainBun: null,
      elements: [],
    });
  });
  it("must be acting DELETE_ALL_CONSTRUCTOR_ELEMENTS correctly", () => {
    state = burgerConstructorElementsReducer(
      {
        mainBun: null,
        elements: [mockElement_1],
      },
      {
        type: DELETE_ALL_CONSTRUCTOR_ELEMENTS,
      }
    );

    expect(state).toEqual({
      mainBun: null,
      elements: [],
    });
  });
});
