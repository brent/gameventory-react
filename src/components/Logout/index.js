import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

function Logout(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  function handleLogOutPress() {
    clearStorage();
    setIsLoggedIn(false);
  }

  function clearStorage() {
    localStorage.removeItem('user');
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('games');
    localStorage.removeItem('gamesSearch');
  }

  return (
    <div>
      {
        isLoggedIn
          ? <button className='button' onClick={ handleLogOutPress }>Log out</button>
          : <Redirect to="/" />
      }
    </div>
  );
}

export default Logout;
