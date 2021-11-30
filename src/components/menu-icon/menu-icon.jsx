import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useResolvedPath, useMatch} from 'react-router-dom';
import { RouteName, generateRoutePath } from '../../routes/helper';
import { useState, useEffect } from 'react';

const MenuIcon = ({ path }) => {
  const resolved = useResolvedPath(path);
  const matchExact = useMatch({ path: resolved.pathname, end: true });
  const matchNotExact = useMatch({ path: resolved.pathname, end: false });

  const iconType = matchExact ? 'primary' : 'secondary';
  const iconProfileType = matchNotExact ? 'primary' : 'secondary';

  const [menuIcon, setMenuIcon] = useState();

  useEffect(() => {
    if (path === generateRoutePath({name: RouteName.main})) {
      setMenuIcon(<BurgerIcon type={iconType}/>);
    } else if (path === generateRoutePath({name: RouteName.listOrders})) {
      setMenuIcon(<ListIcon type={iconType}/>);
    } else if (path === generateRoutePath({name: RouteName.profile})) {
      setMenuIcon(<ProfileIcon type={iconProfileType}/>);
    }
  }, [iconType])

  return (
    <>
      {menuIcon}
    </>
  );
};

export default MenuIcon;
