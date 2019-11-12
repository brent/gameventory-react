import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Profile from '../components/Profile';
import GameDetail from '../components/GameDetail';
import GamesSearch from '../components/GamesSearch';
import Login from '../components/Login';
import Logout from '../components/Logout';
import ListsList from '../components/ListsList';
import ListDetail from '../components/ListDetail';

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
        <PrivateRoute path='/lists/:id' component={ ListDetail } />
        <PrivateRoute path='/lists' component={ ListsList } />
        <PrivateRoute path='/game' component={ GameDetail } />
        <PrivateRoute path='/search' component={ GamesSearch } />
        <PrivateRoute path='/logout' component={ Logout } />
      </Switch>
    </BrowserRouter>
  );
}

export default Index;
