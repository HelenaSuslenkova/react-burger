import { Navigate, useLocation } from 'react-router-dom';
import { generateRoutePath, RouteName } from '../../routes/helper';
import isAutenticated from '../../services/auth/auth';

export function UnauthenticatedLayout({ children }) {
  const {pathname} = useLocation();

  if (isAutenticated()) {
    return <Navigate
      replace
      to={generateRoutePath({name: RouteName.main})}
      state={{pathname: pathname}}
    />;
  }

  return(
    <>
      {children}
    </>
  );
};
