import { IngredientType } from '../utility/api/ingredient';

type IngredientProps = {
  ingredient: IngredientType
}

function Ingredient({ ingredient }: IngredientProps) {
  return (
    <li id={`ingredient-${ingredient.food}`}>{`${ingredient.quantity} ${ingredient.measurement} ${ingredient.food} ${ingredient.info}`}</li>
  );
}

export default Ingredient;
