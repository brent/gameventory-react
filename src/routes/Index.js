import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Profile from '../components/Profile';
import GameDetail from '../components/GameDetail';
import GamesSearch from '../components/GamesSearch';
import Login from '../components/Login';

function Index(props) {
  return (
    <BrowserRouter>
      <div>
        { props.children }
      </div>
      <Switch>
        <Route exact path='/' component={ Profile } />
        <Route path='/login' component={ Login } />
        <Route path='/game' component={ GameDetail } />
        <Route path='/search' component={ GamesSearch } />
      </Switch>
    </BrowserRouter>
  );
}

export default Index;
