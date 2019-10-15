import React, { useState, useEffect } from 'react';
import axios from 'axios';

import GamesList from './GamesList';

function Profile(props) {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const accessToken = localStorage.getItem('access');
    const userID = JSON.parse(localStorage.getItem('user')).id;

    axios({
      method: 'GET',
      url: `http://localhost:3000/api/v1/users/${userID}/games`,
      params: {
        'auth': accessToken,
      }
    })
    .then(response => response.data)
    .then(res => setGames(res.data))
    .catch(err => console.log(err));
  }, []);

  return (
    <div className='profile'>
      <GamesList games={games} />
    </div>
  );
}

export default Profile;
