import React, { useState } from 'react';
import axios from 'axios';

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
    .then(res => {
      localStorage.setItem('gamesSearch', JSON.stringify(res.data));
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
