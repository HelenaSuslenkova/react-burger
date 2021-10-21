import { useContext, useMemo } from 'react';
import burgerConstructorStyles from "./burger-constructor.module.css";
import BurgerConstructorElements from './burger-constructor-elements/burger-constructor-elements';
import BurgerConstructorSummary from './burger-constructor-summary/burger-constructor-summary';
import { BurgerContext } from '../../services/dataContext';

function BurgerConstructor() {
  const { data } = useContext(BurgerContext);

  const mainBun = useMemo(() => {
    const buns = data?.filter((item) => item.type === 'bun');

    return buns && buns[Math.floor(Math.random() * buns?.length)];
  }, [data]);


  const ingredients = useMemo(() => {
    const ingridients = data?.filter((item) => item.type !== 'bun');

    const countOfIngridients = Math.floor(Math.random() * ingridients?.length);
    return ingridients?.sort(() => Math.random() - Math.random()).slice(0, countOfIngridients);
  }, [data]);

  return (
    <>
      <div className={burgerConstructorStyles.container}>
        <div className={burgerConstructorStyles.body}>
          <BurgerConstructorElements ingredients={ingredients} mainBun={mainBun} />
        </div>
        <div className={burgerConstructorStyles.footer}>
          <BurgerConstructorSummary ingredients={ingredients} mainBun={mainBun}/>
        </div>
      </div>
    </>
  );
}

export default BurgerConstructor;
