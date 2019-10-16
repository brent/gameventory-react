import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Profile from '../components/Profile';
import GameDetail from '../components/GameDetail';
import GamesSearch from '../components/GamesSearch';
import Login from '../components/Login';
import PrivateRoute from '../PrivateRoute';

function Index(props) {
  return (
    <BrowserRouter>
      <div>
        { props.children }
      </div>
      <Switch>
        <PrivateRoute exact path='/' component={ Profile } />
        <Route path='/login' component={ Login } />
        <PrivateRoute path='/game' component={ GameDetail } />
        <PrivateRoute path='/search' component={ GamesSearch } />
      </Switch>
    </BrowserRouter>
  );
}

export default Index;
