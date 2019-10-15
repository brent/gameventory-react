import React, { useState } from 'react';
import axios from 'axios';

import GamesList from './GamesList';

function GamesSearch(props) {
  const [games, setGames] = useState([]);
  const [searchVal, setSearchVal] = useState('');

  function handleSearchBarChange(e) {
    setSearchVal(e.target.value)
  }

  function handleSearchBarSubmit(e) {
    let params = new URLSearchParams();
    const accessToken = localStorage.getItem('access');
    params.append('gameName', searchVal);
    params.append('auth', accessToken);

    axios({
      method: 'post',
      baseURL: 'http://localhost:3000/api/v1/',
      url: '/games/search', 
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: params
    })
    .then(response => response.data)
    .then(res => setGames(res.data))
    .catch(err => console.log(err));

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
