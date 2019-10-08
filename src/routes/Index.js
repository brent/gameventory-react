import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import GamesListContainer from '../containers/GamesListContainer';
import GameDetail from '../views/GameDetail';

function Index() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={ GamesListContainer } />
        <Route path='/game' component={ GameDetail } />
      </Switch>
    </BrowserRouter>
  );
}

export default Index;
