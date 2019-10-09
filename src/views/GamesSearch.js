import React from 'react';
import GamesList from './GamesList';

import searchResults from '../gameSearchResults.json';

function GamesSearch(props) {
  const games = searchResults.data;

  return (
    <div className='gamesSearch'>
      <GamesList games={games} />
    </div>
  );
}

export default GamesSearch;
