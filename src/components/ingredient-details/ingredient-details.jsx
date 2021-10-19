import ingredientDetailsStyles from './ingredient-details.module.css';
import { INGREDIENT_DETAILS_TITLES } from '../../utils/const';
import { burgerIngredientType } from '../../utils/types';

function IngredientDetails({ ingredient }) {
  const {name, image, fat, proteins, carbohydrates, calories } = ingredient;

  return(
    <div className={ingredientDetailsStyles.container}>
      <img src={image} alt=''/>
      <p className={`${ingredientDetailsStyles.name} text text_type_main-medium`}>{name}</p>
      <div className={ingredientDetailsStyles.description}>
        <div className={ingredientDetailsStyles.point}>
          <p className="text text_type_main-default text_color_inactive">{INGREDIENT_DETAILS_TITLES.calories}</p>
          <p className="text text_type_digits-default text_color_inactive">{calories}</p>
        </div>
        <div className={ingredientDetailsStyles.point}>
          <p className="text text_type_main-default text_color_inactive">{INGREDIENT_DETAILS_TITLES.proteins}</p>
          <p className="text text_type_digits-default text_color_inactive">{proteins}</p>
        </div>
        <div className={ingredientDetailsStyles.point}>
          <p className="text text_type_main-default text_color_inactive">{INGREDIENT_DETAILS_TITLES.fat}</p>
          <p className="text text_type_digits-default text_color_inactive">{fat}</p>
        </div>
        <div className={ingredientDetailsStyles.point}>
          <p className="text text_type_main-default text_color_inactive">{INGREDIENT_DETAILS_TITLES.carbohydrates}</p>
          <p className="text text_type_digits-default text_color_inactive">{carbohydrates}</p>
        </div>
      </div>
    </div>
  );
}

IngredientDetails.propTypes = {
  ingredient: burgerIngredientType,
}


export default IngredientDetails;
