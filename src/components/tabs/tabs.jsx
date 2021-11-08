import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Tab,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { INGREDIENT_TYPES, TABS_TYPES, } from '../../utils/const';
import tabsStyles from "./tabs.module.css";

const Tabs = ({ types }) => {
  const [current, setCurrent] = useState(TABS_TYPES.bun);

  useEffect(() => {
    document.getElementById('burgerIngredients').addEventListener('scroll', handleScroll);

    return () => {
      document.getElementById('burgerIngredients').removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleScroll = (event) => {
    const targetHeight= event.target.clientHeight;

    Array.from(event.target.childNodes)?.forEach((element) => {
      const top = element.getBoundingClientRect().top;
      if (top > 0 && top < targetHeight) {
        setCurrent(element.id);
      }
    });
  };

  return (
    <nav className={tabsStyles.tabs}>
      {types?.map((type) =>
       <a key={type} href={`#${type}`} className={tabsStyles.tab}>
        <Tab value={INGREDIENT_TYPES[type]} active={current === TABS_TYPES[type]} /*onClick={setCurrent}*/ className="tabs__tab">
          <p className="text text_type_main-default text_color_inactive">{INGREDIENT_TYPES[type]}</p>
        </Tab>
       </a>
      )}
    </nav>
  )
}

Tabs.propTypes = {
  types: PropTypes.arrayOf(
    PropTypes.string,
  ),
}

export default Tabs;
