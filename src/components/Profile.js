import React, { useState, useEffect } from 'react';
import axios from 'axios';

import GamesList from './GamesList';

function Profile(props) {
  const localGames = JSON.parse(localStorage.getItem('games')) || [];
  const [games, setGames] = useState(localGames);

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
    .then(res => {
      localStorage.setItem('games', JSON.stringify(res.data));
      setGames(res.data);
    })
    .catch(err => {
      const res = err.response.data.error;
      if (res.statusCode === 403) {

        const refreshToken = localStorage.getItem('refresh');
        let params = new URLSearchParams();
        params.append('refreshToken', refreshToken);

        axios({
          method: 'POST',
          baseURL: 'http://localhost:3000/api/v1/',
          url: '/auth/token',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          data: params
        })
        .then(response => response.data)
        .then(res => {
          localStorage.setItem('access', res.data.token);
        })
        .catch(err => console.log(err));

      }
      console.log(err.response);
    });
  }, []);

  return (
    <div className='profile'>
      <GamesList games={games} />
    </div>
  );
}

export default Profile;
