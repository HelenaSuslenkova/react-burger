import { useEffect, useState, useMemo } from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { getData } from '../api/requests';
import {
  IngredientsContext,
  MainBunContext,
  GroupedIngredientsContext,
  OrderDetailsContext,
} from '../../services/dataContext';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ingredients, setIngredients] = useState(null);
  const [mainBun, setMainBun] = useState(null);
  const [groupedIngredients, setGroupedIngredients] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    getBurgersData();
  }, []);

  useEffect(() => {
    setIngredients(getRandomIngridients(data));
    setMainBun(getRandomBun(data));
    setGroupedIngredients(getGroupedIngredients(data));
  }, [data])

  async function getBurgersData() {
    setLoading(true);
    const burgersData = await getData();
    burgersData && setData(burgersData);
    setLoading(false);
  }

  function getGroupedIngredients(data) {
    return data?.reduce((result, ingredient) => {
        result[ingredient.type] = result[ingredient.type] || [];
        result[ingredient.type].push(ingredient);
        return result;
    }, {})
  };

  function getRandomBun(data) {
    const buns = data?.filter((item) => item.type === 'bun');

    return buns && buns[Math.floor(Math.random() * buns?.length)];
  };

  function getRandomIngridients(data) {
    const ingridients = data?.filter((item) => item.type !== 'bun');

    const countOfIngridients = Math.floor(Math.random() * ingridients?.length);
    return ingridients?.sort(() => Math.random() - Math.random()).slice(0, countOfIngridients);
  };

  return (
    <>
      <header className={appStyles.header}>
        <AppHeader />
      </header>

      <main className={appStyles.container}>
        <GroupedIngredientsContext.Provider value={{groupedIngredients, setGroupedIngredients}}>
          <section className={appStyles.section}>
            <BurgerIngredients />
          </section>
        </GroupedIngredientsContext.Provider>
        <MainBunContext.Provider value={{mainBun, setMainBun}}>
          <IngredientsContext.Provider value={{ingredients, setIngredients}}>
            <OrderDetailsContext.Provider value={{orderDetails, setOrderDetails}}>
              <section className={appStyles.section}>
                <BurgerConstructor />
              </section>
            </OrderDetailsContext.Provider>
          </IngredientsContext.Provider>
        </MainBunContext.Provider>
      </main>
    </>
  );
}

export default App;
