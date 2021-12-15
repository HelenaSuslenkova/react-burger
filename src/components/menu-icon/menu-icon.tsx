import { useState, useEffect, FC } from 'react';
import { useResolvedPath, useMatch} from 'react-router-dom';
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { RouteName, generateRoutePath } from '../../routes/helper';

type MenuIconProps = {
  path: string;
}
export const MenuIcon: FC<MenuIconProps> = ({ path }): JSX.Element => {
  const resolved = useResolvedPath(path);
  const matchExact = useMatch({ path: resolved.pathname, end: true });
  const matchNotExact = useMatch({ path: resolved.pathname, end: false });

  const iconType = matchExact ? 'primary' : 'secondary';
  const iconProfileType = matchNotExact ? 'primary' : 'secondary';

  const [menuIcon, setMenuIcon] = useState<JSX.Element>();

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
