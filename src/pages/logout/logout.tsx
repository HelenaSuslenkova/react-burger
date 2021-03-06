import { useEffect, useState } from "react";
import { useDispatch } from '../../services/types/hooks';
import { Navigate } from 'react-router-dom';
import { unauthorization } from '../../services/actions/user-details';
import { generateRoutePath, RouteName } from '../../routes/helper';
import { isAutenticated } from '../../services/auth/auth';

export const LogoutPage = (): JSX.Element | null => {
  const dispatch = useDispatch();
  const [isUserLogout, setIsUserLogout] = useState(false);

  const logout = async () => {
    await dispatch(unauthorization());
    setIsUserLogout(true);
  }
  useEffect(() => {
    logout();
  }, []);

  if (isUserLogout && !isAutenticated()) {
    return (
    <Navigate
      replace
      to={generateRoutePath({name: RouteName.main})}
    />);
  }

  return null;
}
