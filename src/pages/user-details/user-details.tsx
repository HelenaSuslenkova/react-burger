import { NavLink, Outlet } from 'react-router-dom';
import userDetailsStyles from './user-details.module.css';

export const UserDetailsPage = (): JSX.Element => {
  return (
    <section className={userDetailsStyles.container}>
      <div className={userDetailsStyles.left_col}>
        <nav className={userDetailsStyles.navigation}>
          <ul>
            <li className={userDetailsStyles.navigation_item}>
              <NavLink
                end
                to='/profile'
                className={`${userDetailsStyles.link} text text_type_main-medium text_color_inactive`}
                style={({ isActive }) => isActive ? {color: '#fff'}: {} }
              >Профиль</NavLink>
            </li>
            <li className={userDetailsStyles.navigation_item}>
              <NavLink
                to='/profile/orders'
                className={`${userDetailsStyles.link} text text_type_main-medium text_color_inactive`}
                style={({ isActive }) => isActive ? {color: '#fff'}: {} }
              >История заказов</NavLink>
            </li>
            <li className={userDetailsStyles.navigation_item}>
              <NavLink
                to='/logout'
                className={`${userDetailsStyles.link} text text_type_main-medium text_color_inactive`}
                style={({ isActive }) => isActive ? {color: '#fff'}: {} }
              >Выход</NavLink>
            </li>
          </ul>
        </nav>
        <div className={userDetailsStyles.info}>
          <p className="text text_type_main-small text_color_inactive">В этом разделе вы можете изменить свои персональные данные</p>
        </div>
      </div>
      <Outlet />
    </section>
  );
}
