import PropTypes from 'prop-types';
import burgerIngredientsStyles from "./burger-ingredients.module.css";
import { INGREDIENT_TYPES } from '../../utils/const';
import BurgerIngredient from './burger-ingredient/burger-ingredient';
import Tabs from '../tabs/tabs';

function BurgerIngredients({ groupedIngredients }) {
  const renderCategories = groupedIngredients && Object.entries(groupedIngredients)?.map(
    ([group, ingredients]) => {
      return (
        <div key={group} id={group} className={burgerIngredientsStyles.category}>
          <p className={`${burgerIngredientsStyles.categorie__header} text text_type_main-medium`}>{INGREDIENT_TYPES[group]}</p>
          {
            ingredients?.map((ingredient) => <BurgerIngredient key={ingredient._id} ingredient={ingredient} />)
          }
        </div>
      )
    }
  );

  const renderTypes = groupedIngredients && Object.keys(groupedIngredients)?.map((key) => key);

  return (
    <div>
      <div className={burgerIngredientsStyles.header}>
        <p className="text text_type_main-large">Соберите бургер</p>
        <Tabs types={renderTypes}/>
      </div>
      <div className={burgerIngredientsStyles.body}>
        {renderCategories}
      </div>
    </div>
  );
}

BurgerIngredients.propTypes = {
  groupedIngredients: PropTypes.object,
}

export default BurgerIngredients;
