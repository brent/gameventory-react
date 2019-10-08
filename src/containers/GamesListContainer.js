import React from 'react';
import gameListData from '../gameListData';
import GamesList from '../views/GamesList';
import GamesSearchBar from '../views/GamesSearchBar';
import GameRow from '../views/GameRow';
import { Link } from 'react-router-dom';

class GamesListContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      games: gameListData,
      filterString: '',
      filterTags: ['test', 'another test'],
    };
  }

  renderGameRows(games) {
    return games.map(game => {
      let gameCoverUrl = '';

      if (game.cover != null) {
        gameCoverUrl = game.cover.url;
      }

      return(
        <Link key={ game.id } to={{
          pathname: '/game',
          state: {
            gameName: game.name,
            gameCoverUrl: gameCoverUrl,
            gameTags: game.tags,
            gameSummary: game.summary,
          },
        }}>
          <GameRow
            gameId={ game.id }
            gameCoverUrl={ gameCoverUrl }
            gameName={ game.name }
            tags={ game.tags }
          />
        </Link>
      );
    });
  }

  // TODO: refactor this nightmare
  getFilteredGames(games, string, tags) {
    return games.filter(game => {
      const gameName = game.name.toLowerCase();
      const filterString = string.toLowerCase();
      const filterTags = tags;

      if (filterString !== '') {
        if (gameName.includes(filterString)) {
          if ((filterTags.length > 0) && (game.tags.length > 0)) {

            let matches = 0;
            filterTags.forEach(filterTagName => {
              game.tags.forEach(gameTag => {
                if (gameTag.tagName === filterTagName) {
                  matches += 1;
                }
              });
            })
            return filterTags.length === matches ? true : false;

          } else {
            return false;
          }
        } else {
          return false;
        }
      }

      return true;
    });
  }

  handleSearchChange = (e) => {
    this.setState({ filterString: e.target.value });
  }

  render() {
    const filteredGames = this.getFilteredGames(
      this.state.games,
      this.state.filterString,
      this.state.filterTags
    );

    return(
      <div className='gamesListWrapper'>
        <GamesSearchBar
          value={ this.state.filterString }
          onChange={ this.handleSearchChange }
        />
        <GamesList
          games={ this.renderGameRows(filteredGames) }
        />
      </div>
    );
  }
}

export default GamesListContainer;
