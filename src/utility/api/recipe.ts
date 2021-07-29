import { apiRequest } from './graphql';
import { IngredientType } from './ingredient';

export type RecipeType = {
  id: string
  name: string
  ingredients: IngredientType[]
  sections: string[]
  categories: string[]
  yield: string
  source?: {
    name?: string,
    url?: string
  }
}

const tempRecipe: RecipeType = {
  id: 'temp',
  name: 'hehe, fuckers',
  ingredients: [
    {
      id: '1',
      quantity: 3,
      measurement: 'cup',
      food: 'water',
      info: '',
    },
    {
      id: '2',
      quantity: 2,
      measurement: 'Tbsp',
      food: 'flour',
      info: 'sifted',
    },
  ],
  sections: [],
  categories: [],
  yield: 'hehe, fuckers',
  source: {
    name: 'Title',
    url: 'https://www.example.com',
  },
};

export async function getRecipe(id: string): Promise<RecipeType | null> {
  const response = await apiRequest([{
    type: 'query',
    fields: [{
      name: 'getRecipe',
      arguments: [
        {
          name: 'id',
          value: `"${id}"`,
        },
      ],
      fields: [
        'id',
        'name',
        'ingredients',
        'sections',
        'categories',
        'yield',
        'source',
        'errors',
      ],
    }],
  }]);

  if (response.data) {
    return response.data.getRecipe;
  }

  return tempRecipe;
}
