import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Navigation from './components/Navigation';

const PrivateRoute = ({ component: Component, ...props }) => {
  function getAuthStatus() {
    const accessToken = localStorage.getItem('access');
    if (accessToken !== null) {
      return true;
    }
    return false;
  }

  return (
    <Route { ...props }
      render={ innerProps =>
          getAuthStatus()
            ? (
              <div>
                <Navigation />
                <Component { ...innerProps } />
              </div>
            )
            : <Redirect to="/login" />
      }
    />
  )
}

export default PrivateRoute;
