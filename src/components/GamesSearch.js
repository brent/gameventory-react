import React, { useState } from 'react';
import API from '../api';
import GamesList from './GamesList';
import localStorageService from '../localStorageService';

function GamesSearch(props) {
  const localGames = localStorageService.getItem('gamesSearch') || [];
  const [games, setGames] = useState(localGames);
  const [searchVal, setSearchVal] = useState('');

  function handleSearchBarChange(e) {
    setSearchVal(e.target.value)
  }

  function handleSearchBarSubmit(e) {
    let params = new URLSearchParams();
    const accessToken = localStorage.getItem('access');
    params.append('gameName', searchVal);
    params.append('auth', accessToken);

    API.findGameByName(params)
      .then((games) => {
        localStorageService.setItem('gamesSearch', games);
        setGames(games);
      })
      .catch((err) => console.log(err));

    e.preventDefault();
  }

  return (
    <div className='gamesSearch' onSubmit={ handleSearchBarSubmit }>
      <form className='searchBar'>
        <input type='text' value={ searchVal } onChange={ handleSearchBarChange } />
      </form>
      <GamesList games={games} />
    </div>
  );
}

export default GamesSearch;
