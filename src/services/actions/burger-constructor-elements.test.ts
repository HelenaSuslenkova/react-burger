import {
  SET_BURGER_MAIN_BUN,
  SET_BURGER_ELEMENTS,
  UPDATE_BURGER_ELEMENTS,
  DELETE_BURGER_ELEMENT,
  DELETE_ALL_CONSTRUCTOR_ELEMENTS,
} from "../action-types/burger-constructor-elements";
import {
  setBurgerMainBun,
  setBurgerElements,
  updateBurgerElements,
  deleteBurgerElement,
  deleteAllConstructorElements,
} from "./burger-constructor-elements";

const mockMainBunItem = {
  _id: "test_id",
  name: "test name",
  type: "bun",
  proteins: 42,
  fat: 42,
  carbohydrates: 42,
  calories: 42,
  price: 42,
  image: "data:image/svg+xml;base64,TEST_IMAGE",
  image_mobile: "data:image/svg+xml;base64,TEST_IMAGE",
  image_large: "data:image/svg+xml;base64,TEST_IMAGE",
  __v: 42,
};

const mockBurgerElement = {
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
};

describe("Burger constructor elements actions", () => {
  it("set burger main bun correctly", () => {
    expect(setBurgerMainBun(mockMainBunItem)).toEqual({
      type: SET_BURGER_MAIN_BUN,
      payload: mockMainBunItem,
    });
  });

  it("set burger elements correctly", () => {
    expect(setBurgerElements(mockBurgerElement)).toEqual({
      type: SET_BURGER_ELEMENTS,
      payload: mockBurgerElement,
    });
  });

  it("update burger elements correctly", () => {
    expect(updateBurgerElements({dragIndex: 0, hoverIndex: 1,})).toEqual({
      type: UPDATE_BURGER_ELEMENTS,
      payload: {dragIndex: 0, hoverIndex: 1},
    });
  });

  it("delete burger elements correctly", () => {
    expect(deleteBurgerElement('test_id')).toEqual({
      type: DELETE_BURGER_ELEMENT,
      payload: 'test_id',
    });
  });

  it("delete all constructor elements correctly", () => {
    expect(deleteAllConstructorElements()).toEqual({
      type: DELETE_ALL_CONSTRUCTOR_ELEMENTS,
    });
  });
});
