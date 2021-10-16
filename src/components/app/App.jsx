import { useEffect, useState, useMemo } from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { API_URL } from '../../utils/const';

function App() {
  const [state, setState] = useState({
    data: null,
    loading: true
  });

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    setState({...state, loading: true});
    await fetch(
      API_URL
    ).then((result) => result.json())
    .then(({ data, success }) => {
      if (success) {
        setState({ data, loading: false });
      } else {
        console.log(`success: ${success}`);
      }
    })
    .catch((e) => {
      console.log(e);
    });
  }

  const groupedIngredients = useMemo(
    () =>
      state.data?.reduce((result, ingredient) => {
        result[ingredient.type] = result[ingredient.type] || [];
        result[ingredient.type].push(ingredient);
        return result;
      }, {}),
    [state]
  );

  return (
    <>
      <header className={appStyles.header}>
        <AppHeader />
      </header>

      <main className={appStyles.container}>
        <section className={appStyles.section}>
          <BurgerIngredients groupedIngredients={groupedIngredients}/>
        </section>

        <section className={appStyles.section}>
          <BurgerConstructor data={state.data}/>
        </section>
      </main>
    </>
  );
}

export default App;
