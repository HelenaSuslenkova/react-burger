import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import burgerIngredientsStyles from "./burger-ingredients.module.css";
import { INGREDIENT_TYPES } from '../../utils/const';
import BurgerIngredient from './burger-ingredient/burger-ingredient';
import Tabs from '../tabs/tabs';
import burgerIngredientsSelector from '../../services/selectors/burger-ingredients';

function BurgerIngredients() {
  const data = useSelector(burgerIngredientsSelector.data);

  const groupedIngredients = useMemo(() => {
    return data?.reduce((result, ingredient) => {
      result[ingredient.type] = result[ingredient.type] || [];
      result[ingredient.type].push(ingredient);
      return result;
    }, {})},
   [data]
  );

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
      <div className={burgerIngredientsStyles.body} id='burgerIngredients'>
        {renderCategories}
      </div>
    </div>
  );
}

export default BurgerIngredients;
