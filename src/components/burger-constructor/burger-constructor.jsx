import { useSelector } from 'react-redux';
import burgerConstructorStyles from "./burger-constructor.module.css";
import BurgerConstructorElements from './burger-constructor-elements/burger-constructor-elements';
import BurgerConstructorSummary from './burger-constructor-summary/burger-constructor-summary';
import burgerConstructorElementsSelector from '../../services/selectors/burger-constructor-elements';

function BurgerConstructor() {
  const mainBun = useSelector(burgerConstructorElementsSelector.mainBun);
  const ingredients = useSelector(burgerConstructorElementsSelector.elements);

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
