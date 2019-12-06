import React from 'react';
import GameListItem from '../GameListItem';
import { Link } from 'react-router-dom';
import { igdbCoverImgSrcForId } from '../../helpers';

function renderGames(games) {
  if (games.length > 0) {
    return games.map((game) => {
      if (game === null) return false;
      return (
        <Link key={ game.id } to={{
          pathname: '/game',
          state: {
            gameID: game.id,
            gameName: game.name,
            gameCoverUrl: igdbCoverImgSrcForId(game.coverImgID),
            gameTags: game.tags || [],
            gameSummary: game.summary,
          },
        }}>
          <GameListItem game={game} />
        </Link>
      )
    })
  } else {
    return <p>nothing here</p>
  }
}

function GamesList(props) {
  return (
    <div className='gamesList'>
      <ul>
        { renderGames(props.games) }
      </ul>
    </div>
  );
}

export default GamesList;
