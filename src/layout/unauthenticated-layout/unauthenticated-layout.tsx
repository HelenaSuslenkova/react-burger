import { FC } from "react";
import { Navigate, useLocation } from 'react-router-dom';
import { generateRoutePath, RouteName } from '../../routes/helper';
import { isAutenticated } from '../../services/auth/auth';

export const UnauthenticatedLayout: FC = ({ children }): JSX.Element => {
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
