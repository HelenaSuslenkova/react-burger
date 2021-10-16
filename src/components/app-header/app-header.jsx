import React from 'react';
import appStyles from '../app/app.module.css';

import headerStyles from "./app-header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
  return (
    <div className={`${appStyles.container} ${headerStyles.container}`}>
      <nav className={headerStyles.navigation}>
        <ul>
          <li className={`
            ${headerStyles.navigation_item}
            ${headerStyles.navigation_item__active}
          `}>
            <BurgerIcon type="primary" />
            <p className="text text_type_main-default">
            Конструктор
            </p>
          </li>
          <li className={`
            ${headerStyles.navigation_item}
            ${headerStyles.navigation_item__last}
          `}>
            <ListIcon type="secondary" />
            <p className="text text_type_main-default text_color_inactive">
              Лента заказов
            </p>
          </li>
        </ul>
      </nav>

      <div className={headerStyles.logo}><Logo /></div>

      <nav className={headerStyles.navigation__right}>
        <ul>
          <li className={`
            ${headerStyles.navigation_item}
            ${headerStyles.navigation_item__last}
          `}>
            <ProfileIcon type="secondary" />
            <p className="text text_type_main-default text_color_inactive">
            Личный кабинет
            </p>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default AppHeader;
