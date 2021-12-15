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
