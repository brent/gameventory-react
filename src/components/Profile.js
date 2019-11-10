import React, { useState, useEffect } from 'react';
import API from '../api';

import GamesList from './GamesList';

function Profile(props) {
  const localGames = JSON.parse(localStorage.getItem('games')) || [];
  const [games, setGames] = useState(localGames);

  useEffect(() => {
    const userID = JSON.parse(localStorage.getItem('user')).id;

    API.getGamesForUser({
      userID: userID,
    })
      .then((games) => {
        localStorage.setItem('games', JSON.stringify(games));
        setGames(games);
      })
      .catch(err => console.log(err));

  }, []);

  return (
    <div className='profile'>
      <GamesList games={games} />
    </div>
  );
}

export default Profile;
