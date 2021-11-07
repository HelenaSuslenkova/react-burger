import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { getBurgerIngredients } from '../../services/actions/burger-ingredients';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBurgerIngredients());
  }, []);

  return (
    <>
      <header className={appStyles.header}>
        <AppHeader />
      </header>
      <main className={appStyles.container}>
        <DndProvider backend={HTML5Backend}>
          <section className={appStyles.section}>
            <BurgerIngredients />
          </section>
          <section className={appStyles.section}>
            <BurgerConstructor />
          </section>
        </DndProvider>
      </main>
    </>
  );
}

export default App;
