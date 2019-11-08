import React, { useState } from 'react';
import API from '../api';
import GamesList from './GamesList';

function GamesSearch(props) {
  const localGames = JSON.parse(localStorage.getItem('gamesSearch')) || [];
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
        localStorage.setItem('gamesSearch', JSON.stringify(games));
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
