import { BrowserRouter, Route, Switch } from 'react-router-dom';
import RecipePage from './pages/RecipePage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/recipes/:id">
          <RecipePage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
