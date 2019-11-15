import React, { useState, useEffect } from 'react';
import API from '../api';
import GamesList from './GamesList';
import localStorageService from '../localStorageService';

function Profile(props) {
  const [games, setGames] = useState([]);
  const [list, setList] = useState({
    id: '',
    name: '',
    games: [],
  });

  useEffect(() => {
    const userID = localStorageService.getItem('user').id;

    API.getGamesForUser({
      userID: userID,
    })
      .then((games) => {
        localStorageService.setItem('games', games);
        setGames(games)
      })
      .catch((err) => console.log(err));

    API.getListForUser({
      listRef: 'Playing',
      userID: userID,
    })
      .then((list) => setList(list))
      .catch(err => console.log(err));

  }, [list.id]);

  return (
    <div className='profile'>
      <h2>{ list.name }</h2>
      <GamesList games={ list.games } />
    </div>
  );
}

export default Profile;
