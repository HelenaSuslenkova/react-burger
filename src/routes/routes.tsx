import { Routes as ReactRouterDomRoutes, Route, useLocation } from 'react-router-dom';
import { AuthenticatedLayout, UnauthenticatedLayout, CommonLayout} from '../layout';
import { MODAL_TYPES } from '../utils/const';

import {
  UserDetailsPage,
  UserProfilePage,
  MainPage,
  IngredientPage,
  ResetPasswordPage,
 } from '../pages';
 import { Modal } from '../components/modals/modal/modal';
 import { IngredientDetails } from '../components/ingredient-details/ingredient-details';

import { getRoutes, routeTypes } from './helper';
import { INGREDIENT_DETAILS_TITLE } from '../utils/const';

export const Routes = () => {
  const { state } = useLocation();

  return (
    <ReactRouterDomRoutes>
      <Route path="/profile" element={<AuthenticatedLayout><UserDetailsPage/></AuthenticatedLayout>}>
        <Route path="" element={<UserProfilePage />} />
        <Route path="orders" element={<>UserOrdersPage</>} />
      </Route>
      {state?.path === "/forgot-password" &&
        <Route path="/reset-password" element={<UnauthenticatedLayout><ResetPasswordPage/></UnauthenticatedLayout>} />
      }
      {getRoutes()[routeTypes.unauthenticated].map(({ label, element, path }) => (
        <Route key={label} element={<UnauthenticatedLayout>{element}</UnauthenticatedLayout>} path={path} />
      ))}
      {getRoutes()[routeTypes.common].map(({ label, element, path }) => (
        <Route key={label} element={<CommonLayout>{element}</CommonLayout>} path={path} />
      ))}
      {!state?.isModalOpen &&
        <Route path="ingredients/:id" element={<CommonLayout><IngredientPage/></CommonLayout>} />
      }
      <Route path="/" element={<CommonLayout><MainPage/></CommonLayout>}>
        <Route path="ingredients/:id" element={<Modal modalType={MODAL_TYPES.modalIngredient} title={INGREDIENT_DETAILS_TITLE} children={<IngredientDetails />}/>} />
      </Route>
    </ReactRouterDomRoutes>
  )
}
