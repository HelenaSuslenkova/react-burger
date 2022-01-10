export interface BurgerIngredientType {
  _id: string,
  id?: string,
  name: string,
  type: string,
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  price: number,
  image: string,
  image_mobile: string,
  image_large: string,
  __v: number,
}
export type OrderDetailsType = {
  name: string,
  order: {
    number: number,
  }
  success: boolean,
};
export type ForgotPasswordRequestType = {
  email: string,
}
export type LoginRequestType = ForgotPasswordRequestType & {
  password: string,
}

export type RegistrationRequestType = LoginRequestType & {
  name: string,
}

export type ResetPasswordRequestType = {
  password: string,
  token: string,
}

export type UnauthorizationResponceType = {
  success: boolean,
  message?: string,
}

export type UserDetailsResponceType = UnauthorizationResponceType & {
  user: {
    email: string,
    name: string,
  },
}

export type AauthorizationResponceType = UserDetailsResponceType & {
  accessToken: string,
  refreshToken: string,
}

export type RefreshTokenResponceType = UnauthorizationResponceType & {
  accessToken: string,
  refreshToken: string,
}

type OrdersType = {
  ingredients: Array<string>,
  _id: string,
  status: string,
  number: number,
  createdAt: string,
  updatedAt: string,
}

export type OrdersListResponceType = {
  success: boolean,
  orders: Array<OrdersType>,
  total: number,
  totalToday: number,
}
