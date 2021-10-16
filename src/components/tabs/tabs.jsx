import React from 'react';
import {
  Tab,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { INGREDIENT_TYPES } from '../../utils/const';
import tabsStyles from "./tabs.module.css";

const Tabs = ({ types }) => {
  const [current, setCurrent] = React.useState(INGREDIENT_TYPES.bun);

  return (
    <nav className={tabsStyles.tabs}>
      {types?.map((type) =>
       <a key={type} href={`#${type}`} className={tabsStyles.tab}>
        <Tab value={INGREDIENT_TYPES[type]} active={current === INGREDIENT_TYPES[type]} onClick={setCurrent} className="tabs__tab">
          <p className="text text_type_main-default text_color_inactive">{INGREDIENT_TYPES[type]}</p>
        </Tab>
       </a>
      )}
    </nav>
  )
}

export default Tabs;
