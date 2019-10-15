import React from 'react';
import BackButton from './BackButton';
import axios from 'axios';

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
        { tag.tag_name }
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

    axios({
      method: 'post',
      baseURL: 'http://localhost:3000/api/v1/',
      url: '/users/games/',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: params
    })
    .then(response => response.data)
    .then(res => console.log('GAME ADDED'))
    .catch(err => console.log(err));

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
