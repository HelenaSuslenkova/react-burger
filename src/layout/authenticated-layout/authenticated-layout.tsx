import { useEffect, FC } from "react";
import { useDispatch } from '../../services/types/hooks';
import { Navigate, useLocation } from 'react-router-dom';
import { retriableFetch } from '../../services/actions/user-details';
import { generateRoutePath, RouteName } from '../../routes/helper';
import { isAutenticated } from '../../services/auth/auth';

export const AuthenticatedLayout: FC = ({ children }): JSX.Element => {

  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const getUserData = async () => {
    const urlPath = `auth/user`;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('accessToken')}`,
      },
    }
    dispatch(retriableFetch(urlPath, options));
  };

  useEffect(() => {
    getUserData();
  }, []);

  if (!isAutenticated()) {
    return <Navigate
      replace
      to={generateRoutePath({name: RouteName.login})}
      state={{pathname: pathname}}
    />;
  }

  return(
    <>
      {children}
    </>
  );
};
