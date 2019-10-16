import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...props }) => {
  function getAuthStatus() {
    const refreshToken = localStorage.getItem('refresh');
    if (refreshToken !== null) {
      return true;
    }
    return false;
  }

  return (
    <Route { ...props }
      render={ innerProps =>
          getAuthStatus()
            ? <Component { ...innerProps } />
            : <Redirect to="/login" />
      }
    />
  )
}

export default PrivateRoute;
