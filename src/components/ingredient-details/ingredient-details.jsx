import PropTypes from 'prop-types';
import ingredientDetailsStyles from './ingredient-details.module.css';
import { INGREDIENT_DETAILS_TITLES } from '../../utils/const'


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
  ingredient: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number,
  }).isRequired,
}


export default IngredientDetails;
