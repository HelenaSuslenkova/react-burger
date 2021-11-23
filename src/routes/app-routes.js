import { BrowserRouter as Router, Routes as ReactRouterDomRoutes, Route, useLocation } from 'react-router-dom';
import { AuthenticatedLayout, UnauthenticatedLayout, CommonLayout} from '../layout';

import {
  UserDetailsPage,
  UserProfilePage,
  MainPage,
  IngredientPage,
 } from '../pages';
 import IngredientModal from '../components/modals/modal/ingredient-modal';
 import IngredientDetails from '../components/ingredient-details/ingredient-details';

import { getRoutes, routeTypes } from './helper';
import { ingredientDetailsTitle } from '../utils/const';

export const AppRoutes = () => {
  return (
    <Router>
      <Routes/>
    </Router>
  )
};

const Routes = () => {
  const { state } = useLocation();

  return (
  <>
    <ReactRouterDomRoutes>
      <Route path="/profile" element={<AuthenticatedLayout><UserDetailsPage/></AuthenticatedLayout>}>
        <Route path="" element={<UserProfilePage />} />
        <Route path="orders" element={<>UserOrdersPage</>} />
      </Route>
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
        <Route path="ingredients/:id" element={<IngredientModal title={ingredientDetailsTitle} children={<IngredientDetails />}/>} />
      </Route>
    </ReactRouterDomRoutes>
  </>
  )
}
