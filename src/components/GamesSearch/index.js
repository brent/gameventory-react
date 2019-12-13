import React, { useState } from 'react';
import API from '../../api';
import GamesList from '../GamesList';
import localStorageService from '../../localStorageService';
import './index.css';

function GamesSearch(props) {
  const localGames = localStorageService.getItem('gamesSearch') || [];
  const [games, setGames] = useState(localGames);
  const [searchVal, setSearchVal] = useState('');

  function handleSearchBarChange(e) {
    setSearchVal(e.target.value);
  }

  function handleSearchBarSubmit(e) {
    let params = new URLSearchParams();
    const accessToken = localStorage.getItem('access');
    params.append('gameName', searchVal);

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
        <input type='text' value={ searchVal } onChange={ handleSearchBarChange } placeholder='find a game' />
      </form>
      <GamesList games={games} />
    </div>
  );
}

export default GamesSearch;
