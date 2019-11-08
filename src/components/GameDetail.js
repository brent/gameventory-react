import React from 'react';
import BackButton from './BackButton';
import API from '../api';

function GameDetail(props) {
  const {
    gameID,
    gameName,
    gameCoverUrl,
    gameTags,
    gameSummary,
  } = props.location.state;

  function renderTags(tags) {
    if (tags === undefined ||
        tags === null ||
        tags.length === 0)
      return null;

    const tagsList = tags.map(tag => (
      <li key={ tag.id } className='gameTag'>
        { tag.name }
      </li>
    ));

    return (
      tagsList.length > 0
      ? (
          <ul className='gameTags'>
            { tagsList }
          </ul>
      )
      : false
    );
  }

  function renderAddGameButton() {
    const userGames = JSON.parse(localStorage.getItem('games'));
    const result = userGames.filter(game => game.id === gameID);

    if (result.length === 1) return;

    return (
      <div className='gameAdd'>
        <button className='gameAdd__cta' onClick={ handleAddGamePress }>Add game</button>
      </div>
    );
  }

  function handleAddGamePress(e) {

    let params = new URLSearchParams();
    const accessToken = localStorage.getItem('access');
    const user = JSON.parse(localStorage.getItem('user'));
    params.append('userID', user.id);
    params.append('gameID', gameID);
    params.append('auth', accessToken);

    API.addGameToUser(params)
      .catch(err => console.log(err));;

    e.preventDefault();
  }

  return (
    <div className='gameDetail'>
      <BackButton history={ props.history } />

      <img src={ gameCoverUrl } alt={ `${gameName} cover` } />
      <h1>{ gameName }</h1>
      <p className='gameSummary'>
        { gameSummary }
      </p>
      { renderTags(gameTags) }
      { renderAddGameButton() }
    </div>
  );
}

export default GameDetail;
