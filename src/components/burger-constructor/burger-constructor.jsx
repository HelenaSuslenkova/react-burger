import burgerConstructorStyles from "./burger-constructor.module.css";
import BurgerConstructorElements from './burger-constructor-elements/burger-constructor-elements';
import BurgerConstructorSummary from './burger-constructor-summary/burger-constructor-summary';

function BurgerConstructor() {
  return (
    <div className={burgerConstructorStyles.container}>
      <div className={burgerConstructorStyles.body}>
        <BurgerConstructorElements />
      </div>
      <div className={burgerConstructorStyles.footer}>
        <BurgerConstructorSummary />
      </div>
    </div>
  );
}

export default BurgerConstructor;
