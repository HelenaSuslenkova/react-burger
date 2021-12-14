import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import mainStyles from './main.module.css';
import { BurgerIngredients } from '../../components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../../components/burger-constructor/burger-constructor';

export const MainPage = (): JSX.Element => {
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
