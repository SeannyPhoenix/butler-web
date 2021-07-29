import { useMemo } from 'react';
import styled from 'styled-components';
import { Color, Flex } from '../styles/global';
import { IngredientType } from '../utility/api/ingredient';
import { RecipeType } from '../utility/api/recipe';
import ExternalLink from './ExternalLink';
import Ingredient from './Ingredient';

type RecipeCardsProps = {
  recipe: RecipeType
}

const Card = styled.div`
  ${Flex.column}
`;

const Header = styled.div`
  ${Flex.row}
`;

const Title = styled.div`
  font-size: 2em;
  padding: 5px 10px;
  border-top: 1px solid black;
  border-right: 1px solid black;
  border-left: 1px solid black;
  background-color: tan;
  color: ${Color.primary};
`;

const Source = styled.div`
  font-size: 1em;
  padding: 5px 10px;
  justify-content: right;
  align-items: baseline;
  border-bottom: 1px solid black;
  flex-grow: 1;
`;

const Body = styled.div`
  ${Flex.row}
  border-right: 1px solid black;
  border-bottom: 1px solid black;
  border-left: 1px solid black;
  background-color: tan;
`;

const IngredientList = styled.ul`
  ${Flex.column}
`;

function useRecipeList(ingredientList: IngredientType[]) {
  // eslint-disable-next-line max-len
  const elements = useMemo(() => ingredientList.map((ingredient) => <Ingredient key={ingredient.id} ingredient={ingredient} />), [ingredientList]);
  return elements;
}

function RecipeCard({ recipe }: RecipeCardsProps) {
  const { name, source } = recipe;

  const list = useRecipeList(recipe.ingredients);
  console.log(recipe);

  return (
    <Card>
      <Header>
        <Title>
          {name}
        </Title>
        <Source>
          {source?.url ? <ExternalLink source={source} /> : source?.name || null }
        </Source>
      </Header>
      <Body>
        <IngredientList>
          {list}
        </IngredientList>
      </Body>
    </Card>
  );
}

export default RecipeCard;
