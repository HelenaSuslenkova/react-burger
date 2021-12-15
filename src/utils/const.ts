export enum INGREDIENT_TYPES  {
  bun = 'Булки',
  main = 'Начинки',
  sauce = 'Соусы',
};

export enum BUN_POSITIONS {
  top = 'верх',
  bottom = 'низ',
}

export enum DRAGGABLE_TYPES  {
  ingredient = 'ingredient',
  constructorElement = 'constructorElement',
}

export enum TABS_TYPES  {
  bun = 'bun',
  main = 'main',
  sauce = 'sauce',
}

export enum HEADER_MENU_TYPES {
  left = 'left',
  right = 'right',
}

export enum PROFILE_MENU_TYPES {
  left = 'left',
}

export enum MODAL_TYPES {
  modalOrder = 'modal-order',
  modalIngredient = 'modal-ingredient',
}

export const DEFAULT_MESSAGE_TITLE = 'Тут пока пусто :(';

export const ORDER_BUTTON_LABEL = 'Оформить заказ';

export const INGREDIENT_DETAILS_TITLE = 'Детали ингридиента';

export const ORDER_DETAILS_LABELS = {
  numberDescription: 'идентификатор заказа',
  status: "Ваш заказ начали готовить",
  comment: "Дождитесь готовности на орбитальной станции"
};

export const INGREDIENT_DETAILS_TITLES = {
  calories: 'Калории,ккал',
  proteins: 'Белки,г',
  fat: 'Жиры,г',
  carbohydrates: 'Углеводы,г',
}
