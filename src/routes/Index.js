import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import GamesListContainer from '../containers/GamesListContainer';
import GameDetail from '../views/GameDetail';
import GamesSearch from '../views/GamesSearch';

function Index(props) {
  return (
    <BrowserRouter>
      <div>
        { props.children }
      </div>
      <Switch>
        <Route exact path='/' component={ GamesListContainer } />
        <Route path='/game' component={ GameDetail } />
        <Route path='/search' component={ GamesSearch } />
      </Switch>
    </BrowserRouter>
  );
}

export default Index;
