import { useState, useEffect, FC } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import tabsStyles from "./tabs.module.css";
import { INGREDIENT_TYPES, TABS_TYPES, } from '../../utils/const';


type TabsProps = {
  types: Array<string>;
}
export const Tabs: FC<TabsProps> = ({ types }): JSX.Element => {
  const [current, setCurrent] = useState<TABS_TYPES>(TABS_TYPES.bun);

  useEffect(() => {
    document.getElementById('burgerIngredients')!.addEventListener('scroll', handleScroll);

    return () => {
      document.getElementById('burgerIngredients')?.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleScroll = (event: Event) => {
    const targetHeight = (event.currentTarget as HTMLDivElement).clientHeight;

    Array.from((event.currentTarget as HTMLDivElement).childNodes)?.forEach((node) => {
      const top = (node as Element).getBoundingClientRect().top;
      if (top > 0 && top < targetHeight) {
        setCurrent(TABS_TYPES[(node as Element).id as keyof typeof TABS_TYPES]);
      }
    });
  };

  return (
    <nav className={tabsStyles.tabs}>
      {types?.map((type) =>
       <a key={type} href={`#${type}`} className={tabsStyles.tab}>
        <Tab value={INGREDIENT_TYPES[type as keyof typeof INGREDIENT_TYPES]} active={current === TABS_TYPES[type as keyof typeof TABS_TYPES]} onClick={()=> {}} >
          <p className="text text_type_main-default text_color_inactive">{INGREDIENT_TYPES[type as keyof typeof INGREDIENT_TYPES]}</p>
        </Tab>
       </a>
      )}
    </nav>
  )
}
