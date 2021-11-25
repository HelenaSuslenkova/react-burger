import { generatePath } from 'react-router-dom';
import {
  LoginPage,
  UserDetailsPage,
  MainPage,
  RegistrationPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  Page404,
  LogoutPage,
 } from '../pages';

export const RouteName = {
  profile: 'profile',
  userOrders: 'userOrders',
  userProfile: 'userProfile',
  listOrders: 'listOrders',
  login: 'login',
  logout: 'logout',
  main: 'main',
  register: 'register',
  forgotPassword: 'forgotPassword',
  resetPassword: 'resetPassword',
  notFound: 'notFound',
};

export const routeTypes = {
  unauthenticated: 'unauthenticated',
  authenticated: 'authenticated',
  common: 'common',
};

const routes = {
  [RouteName.main]: {
    label: 'Конструктор',
    path: '/',
    type: '',
    headerMenu: 'left',
    profileMenu: false,
    element: <MainPage/>
  },
  [RouteName.listOrders]: {
    label: 'Лента заказов',
    path: '/list-orders',
    type: routeTypes.common,
    headerMenu: 'left',
    profileMenu: false,
    element: <>ListOrdersPage</>
  },
  [RouteName.login]: {
    label: 'Login',
    path: '/login',
    type: routeTypes.unauthenticated,
    headerMenu: false,
    profileMenu: false,
    element: <LoginPage/>,
  },
  [RouteName.register]: {
    label: 'Registration',
    path: '/register',
    type: routeTypes.unauthenticated,
    headerMenu: false,
    profileMenu: false,
    element: <RegistrationPage/>,
  },
  [RouteName.forgotPassword]: {
    label: 'Forgot Password',
    path: '/forgot-password',
    type: routeTypes.unauthenticated,
    headerMenu: false,
    profileMenu: false,
    element: <ForgotPasswordPage/>,
  },
  [RouteName.resetPassword]: {
    label: 'Reset Password',
    path: '/reset-password',
    type: '',
    headerMenu: false,
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
    headerMenu: false,
    profileMenu: false,
    element: <LogoutPage/>,
  },
  [RouteName.notFound]: {
    label: 'Page 404',
    path: '*',
    type: routeTypes.common,
    headerMenu: false,
    element: <Page404/>,
  },
}


export const getRoutes = () => {
  return Object.values(routes).reduce((result, route) => {
    result[route.type] = result[route.type] || [];
    result[route.type].push(route);

    return result;
  }, {});
}

export const getHeaderMenuRoutes = () => {
  return Object.values(routes).reduce((result, route) => {
    if(route.headerMenu) {
      result[route.headerMenu] = result[route.headerMenu] || [];
      result[route.headerMenu].push(route);
    }

    return result;
  }, {});
}

export const getProfileMenuRoutes = () => {
  return Object.values(routes).reduce((result, route) => {
    if(route.profileMenu) {
      result[route.profileMenu] = result[route.profileMenu] || [];
      result[route.profileMenu].push(route);
    }

    return result;
  }, {});
}


export function generateRoutePath({ name, params }) {
  const route = routes[name];
  return generatePath(route.path, params);
}
