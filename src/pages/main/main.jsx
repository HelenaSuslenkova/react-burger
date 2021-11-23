import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import mainStyles from './main.module.css';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import { getBurgerIngredients } from '../../services/actions/burger-ingredients';

export function MainPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBurgerIngredients());
  }, []);

  return (
    <>
      <main className={mainStyles.container}>
        <DndProvider backend={HTML5Backend}>
          <section className={mainStyles.section}>
            <BurgerIngredients />
          </section>
          <section className={mainStyles.section}>
            <BurgerConstructor />
          </section>
        </DndProvider>
      </main>
    </>
  );
}
