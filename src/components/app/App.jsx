import { useEffect, useState } from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { getData } from '../api/requests';
import { OrderDetailsContext, BurgerContext } from '../../services/dataContext';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    getBurgersData();
  }, []);

  async function getBurgersData() {
    setLoading(true);
    try {
      const burgersData = await getData();
      burgersData && setData(burgersData);
    } catch (e) {
      console.log(e.message)
    }
    setLoading(false);
  }

  return (
    <>
      <header className={appStyles.header}>
        <AppHeader />
      </header>
      <main className={appStyles.container}>
        <BurgerContext.Provider value={{data, setData}}>
          <OrderDetailsContext.Provider value={{orderDetails, setOrderDetails}}>
            <section className={appStyles.section}>
              <BurgerIngredients />
            </section>
            <section className={appStyles.section}>
              <BurgerConstructor />
            </section>
          </OrderDetailsContext.Provider>
        </BurgerContext.Provider>
      </main>
    </>
  );
}

export default App;
