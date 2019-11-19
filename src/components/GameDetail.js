import React, { useState } from 'react';
import BackButton from './BackButton';
import localStorageService from '../localStorageService';
import ListsList from './ListsList';
import API from '../api';

function GameDetail(props) {
  const {
    gameID,
    gameName,
    gameCoverUrl,
    gameTags,
    gameSummary,
  } = props.location.state;

  const [isListsListVisible, setIsListsListVisible] = useState(false);
  const [lists, setLists] = useState([]);

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
    const userGames = localStorageService.getItem('games');
    const result = userGames.filter(game => game.id === gameID);

    if (result.length === 1) return;

    if (isListsListVisible) {
      return <ListsList lists={ lists } onClick={ handleAddToListPress } />;
    } else {
      return (
        <div className='gameAdd'>
          <button className='gameAdd__cta' onClick={ handleAddGamePress }>Add game</button>
        </div>
      );
    }
  }

  function handleAddToListPress(listID) {
    const user = localStorageService.getItem('user');

    API.addGameToUser({
      userID: user.id,
      gameID: gameID,
    })
      .then(API.addGameToListForUser({
        userID: user.id,
        gameID: gameID,
        listID: listID,
      }))
      .catch((err) => console.log(err));
  }

  function handleAddGamePress(e) {
    const userID = localStorageService.getItem('user').id;

    API.getListsForUser({ userID: userID })
      .then((lists) => {
        localStorageService.setItem('lists', lists);
        setLists(lists);
        setIsListsListVisible(true);
      })
      .catch((err) => console.log(err));
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
