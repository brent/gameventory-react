import React from 'react';
import { Link } from 'react-router-dom';

import GameSearchResultsRow from './GameSearchResultsRow';
import { igdbCoverImgSrcForId } from '../helpers';

import searchResults from '../gameSearchResults.json';

function renderSearchResults(response) {
  return response.data.map(game => {
    const coverUrl = igdbCoverImgSrcForId(game.igdb_cover_img_id);
    return (
      <Link key={ game.id } to={{
        pathname: '/game',
        state: {
          gameName: game.igdb_name,
          gameCoverUrl: coverUrl,
          gameTags: [],
          gameSummary: game.igdb_summary,
        },
      }}>
        <GameSearchResultsRow game={ game } />
      </Link>
    );
  });
}

function GamesSearch(props) {
  return (
    <div className='gamesSearch'>
      <h2>Games search</h2>
      <ul>
        { renderSearchResults(searchResults) }
      </ul>
    </div>
  );
}

export default GamesSearch;
