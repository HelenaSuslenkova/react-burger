import { generatePath, Params } from 'react-router-dom';
import { ReactElement } from 'react';
import {
  LoginPage,
  UserDetailsPage,
  MainPage,
  RegistrationPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  Page404,
  LogoutPage,
  OrdersFeedPage,
 } from '../pages';

export enum RouteName  {
  profile = 'profile',
  ordersFeed = 'ordersFeed',
  login = 'login',
  logout = 'logout',
  main = 'main',
  register = 'register',
  forgotPassword = 'forgotPassword',
  resetPassword = 'resetPassword',
  notFound = 'notFound',
};

export interface RouteConfig {
  label: string;
  path: string;
  element: ReactElement;
  headerMenu: string;
  profileMenu?: boolean;
  profileMain?: boolean;
  profileOutlet?: boolean;
  type: keyof typeof routeTypes;
}

export enum routeTypes {
  unauthenticated = 'unauthenticated',
  authenticated = 'authenticated',
  common = 'common',
  notDefined = 'notDefined',
};

const routes: Record<RouteName, RouteConfig>  = {
  [RouteName.main]: {
    label: 'Конструктор',
    path: '/',
    type: routeTypes.notDefined,
    headerMenu: 'left',
    profileMenu: false,
    element: <MainPage/>
  },
  [RouteName.ordersFeed]: {
    label: 'Лента заказов',
    path: '/feed',
    type: routeTypes.common,
    headerMenu: 'left',
    profileMenu: false,
    element: <OrdersFeedPage/>
  },
  [RouteName.login]: {
    label: 'Login',
    path: '/login',
    type: routeTypes.unauthenticated,
    headerMenu: '',
    profileMenu: false,
    element: <LoginPage/>,
  },
  [RouteName.register]: {
    label: 'Registration',
    path: '/register',
    type: routeTypes.unauthenticated,
    headerMenu: '',
    profileMenu: false,
    element: <RegistrationPage/>,
  },
  [RouteName.forgotPassword]: {
    label: 'Forgot Password',
    path: '/forgot-password',
    type: routeTypes.unauthenticated,
    headerMenu: '',
    profileMenu: false,
    element: <ForgotPasswordPage/>,
  },
  [RouteName.resetPassword]: {
    label: 'Reset Password',
    path: '/reset-password',
    type: routeTypes.notDefined,
    headerMenu: '',
    profileMenu: false,
    element: <ResetPasswordPage/>,
  },
  [RouteName.profile]: {
    label: 'Личный кабинет',
    path: '/profile',
    type: routeTypes.authenticated,
    headerMenu: 'right',
    profileMenu: true,
    profileMain: true,
    profileOutlet: false,
    element: <UserDetailsPage/>,
  },
  [RouteName.logout]: {
    label: 'Выход',
    path: '/logout',
    type: routeTypes.common,
    headerMenu: '',
    profileMenu: false,
    element: <LogoutPage/>,
  },
  [RouteName.notFound]: {
    label: 'Page 404',
    path: '*',
    headerMenu: '',
    type: routeTypes.common,
    element: <Page404/>,
  },
}


export function getRoutes() {
  return Object.values(routes).reduce((result: { [key: string]: RouteConfig[] }, route: RouteConfig) => {
    result[route.type] = result[route.type] || [];
    result[route.type].push(route);

    return result;
  }, {});
};

export function getHeaderMenuRoutes() {
  return Object.values(routes).reduce((result: { [key: string]: RouteConfig[] }, route: RouteConfig) => {
    result[route.headerMenu] = result[route.headerMenu] || [];
    result[route.headerMenu].push(route);

    return result;
  }, {});
}

export function generateRoutePath({ name, params }: { name: RouteName; params?: Params<string>}): string {
  const route = routes[name];
  return generatePath(route.path, params);
}
