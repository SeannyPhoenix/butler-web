import { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { validate } from 'uuid';
import RecipeCard from '../components/RecipeCard';
import { getRecipe, RecipeType } from '../utility/api/recipe';

type RecipeIdParam = {id: string};

function RecipePage() {
  const [recipe, setRecipe] = useState<RecipeType | null>(null);

  const history = useHistory();

  const { id } = useParams<RecipeIdParam>();

  const recipeFetcher = useCallback(async () => {
    const newRecipe = await getRecipe(id);
    console.log(newRecipe);
    setRecipe(newRecipe);
  }, []);

  useEffect(() => {
    if (!validate(id)) {
      history.replace('/recipes');
    } else {
      recipeFetcher();
    }
  }, [id]);

  return (
    recipe ? <RecipeCard recipe={recipe} /> : null
  );
}

export default RecipePage;
