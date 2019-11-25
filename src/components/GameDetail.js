import React, { useState } from 'react';
import BackButton from './BackButton';
import localStorageService from '../localStorageService';
import ListsList from './ListsList';
import API from '../api';
import TagsList from './TagsList';

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

  function renderAddOrMoveGameButton() {
    const usersLists = localStorageService.getItem('lists');
    let el, isGameOnList;

    usersLists.forEach((list) => {
      list['games'].forEach((game) => {
        if (game.id === gameID) {
          isGameOnList = true;
        }
      });
    });

    if (isListsListVisible) {
      if (isGameOnList) {
        el = <ListsList lists={ lists } onClick={ handleMoveGameToListPress } />;
      } else {
        el = <ListsList lists={ lists } onClick={ handleAddToListPress } />;
      }

      el = (
        <div className="listsListWrapper">
          { el }
          <button onClick={ () => setIsListsListVisible(false) }>cancel</button>
        </div>
      );
    } else {
      if (isGameOnList) {
        el = <button onClick={ handleAddOrMoveGamePress }>Move game</button>;
      } else {
        el = <button onClick={ handleAddOrMoveGamePress }>Add game</button>;
      }
    }

    return el;
  }

  function handleMoveGameToListPress(listID) {
    const user = localStorageService.getItem('user');

    API.addGameToListForUser({
      userID: user.id,
      gameID: gameID,
      listID: listID,
    })
      .catch((err) => console.log(err));
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

  function handleAddOrMoveGamePress(e) {
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
      <TagsList tags={ gameTags } />
      { renderAddOrMoveGameButton() }
    </div>
  );
}

export default GameDetail;
