import { useParams, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/types/hooks';
import { useEffect, useState } from 'react';
import ingredientDetailsStyles from './ingredient-details.module.css';
import { INGREDIENT_DETAILS_TITLES, INGREDIENT_DETAILS_TITLE } from '../../utils/const';
import { BurgerIngredientType } from '../../utils/types';
import burgerIngredientsSelector from '../../services/selectors/burger-ingredients';

export const IngredientDetails = (): JSX.Element => {
  const { state } = useLocation();
  const { id: ingredientId } = useParams();
  const [ ingredient, setIngredient ] = useState<BurgerIngredientType>();
  const data  = useSelector(burgerIngredientsSelector.data);

  useEffect(() => {
    const currentIngredient = data.filter((item: BurgerIngredientType) => item._id === ingredientId)[0];
    setIngredient(currentIngredient);
  }, [data, ingredientId]);

  return(
    <div className={`${ingredientDetailsStyles.container} ${!state?.isModalOpen && ingredientDetailsStyles.title}`}>

      { !state?.isModalOpen &&
        <p className="text text_type_main-large">{INGREDIENT_DETAILS_TITLE}</p>
      }
      <img src={ingredient?.image} alt=''/>
      <p className={`${ingredientDetailsStyles.name} text text_type_main-medium`}>{ingredient?.name}</p>
      <div className={ingredientDetailsStyles.description}>
        <div className={ingredientDetailsStyles.point}>
          <p className="text text_type_main-default text_color_inactive">{INGREDIENT_DETAILS_TITLES.calories}</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient?.calories}</p>
        </div>
        <div className={ingredientDetailsStyles.point}>
          <p className="text text_type_main-default text_color_inactive">{INGREDIENT_DETAILS_TITLES.proteins}</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient?.proteins}</p>
        </div>
        <div className={ingredientDetailsStyles.point}>
          <p className="text text_type_main-default text_color_inactive">{INGREDIENT_DETAILS_TITLES.fat}</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient?.fat}</p>
        </div>
        <div className={ingredientDetailsStyles.point}>
          <p className="text text_type_main-default text_color_inactive">{INGREDIENT_DETAILS_TITLES.carbohydrates}</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient?.carbohydrates}</p>
        </div>
      </div>
    </div>
  );
}
