import { useMemo } from 'react';
import { useSelector } from '../../services/types/hooks';
import { Outlet } from 'react-router-dom';
import burgerIngredientsStyles from "./burger-ingredients.module.css";
import { INGREDIENT_TYPES } from '../../utils/const';
import { BurgerIngredient } from './burger-ingredient/burger-ingredient';
import { Tabs } from '../tabs/tabs';
import burgerIngredientsSelector from '../../services/selectors/burger-ingredients';
import { BurgerIngredientType } from '../../utils/types';

export const BurgerIngredients = (): JSX.Element => {
  type groupedIngredientsType = {
    [key: string]: Array<BurgerIngredientType>,
  };

  const data = useSelector(burgerIngredientsSelector.data);

  const groupedIngredients = useMemo<groupedIngredientsType>(() => {
    return data?.reduce((result: groupedIngredientsType, ingredient: BurgerIngredientType) : groupedIngredientsType => {
      result[ingredient.type] = result[ingredient.type] || [];

      result[ingredient.type].push(ingredient);
      return result;
    }, {})},
   [data]
  );

  const renderCategories = groupedIngredients && Object.entries(groupedIngredients)?.map(
    ([group, ingredients]: [string, Array<BurgerIngredientType>]) => {
      return (
        <div key={group} id={group} className={burgerIngredientsStyles.category}>
          <p className={`${burgerIngredientsStyles.categorie__header} text text_type_main-medium`}>{INGREDIENT_TYPES[group as keyof typeof INGREDIENT_TYPES]}</p>
          {
            ingredients?.map((ingredient: BurgerIngredientType) => <BurgerIngredient key={ingredient._id} ingredient={ingredient} />)
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

      <Outlet/>
    </div>
  );
}
