import { NavLink } from 'react-router-dom';
import mainStyles from '../../pages/main/main.module.css';
import headerStyles from "./app-header.module.css";
import { Logo,} from '@ya.praktikum/react-developer-burger-ui-components';
import { getHeaderMenuRoutes } from '../../routes/helper';
import { HEADER_MENU_TYPES } from '../../utils/const';
import MenuIcon from '../menu-icon/menu-icon';

function AppHeader() {
  return (
    <header className={headerStyles.header}>
      <div className={`${mainStyles.container} ${headerStyles.container}`}>
        <nav className={headerStyles.navigation}>
          <ul>
          {getHeaderMenuRoutes()[HEADER_MENU_TYPES.left].map(({path, label}, index) => (
            <li key={index} className={`${headerStyles.navigation_item} ${headerStyles.navigation_item__active}`}>
              <MenuIcon path={path} />
              <span className={headerStyles.link_wrapper}>
                <NavLink
                  to={path}
                  className={`${headerStyles.link} text text_type_main-default text_color_inactive`}
                  style={({ isActive }) => isActive ? {color: '#fff'}: undefined }
                >
                  {label}
                </NavLink>
              </span>
            </li>
          ))}
          </ul>
        </nav>

        <div className={headerStyles.logo}><Logo /></div>

        <nav className={headerStyles.navigation__right}>
          <ul>
          {getHeaderMenuRoutes()[HEADER_MENU_TYPES.right].map(({path, label}, index) => (
            <li key={index} className={`${headerStyles.navigation_item} ${headerStyles.navigation_item__active}`}>
              <MenuIcon path={path} />
              <span className={headerStyles.link_wrapper}>
              <NavLink
                to={path}
                className={`${headerStyles.link} text text_type_main-default text_color_inactive`}
                style={({ isActive }) => isActive ? {color: '#fff'}: undefined }
                >
                {label}
              </NavLink>
              </span>
            </li>
          ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;
