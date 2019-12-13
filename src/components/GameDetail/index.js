import React, { useState, useEffect } from 'react';
import BackButton from '../BackButton';
import localStorageService from '../../localStorageService';
import ListsList from '../ListsList';
import API from '../../api';
import TagsEditor from '../TagsEditor';
import './index.css';

function GameDetail(props) {
  const {
    gameID,
    gameName,
    gameCoverUrl,
    /* gameHeroUrl, */
    gameTags,
    gameSummary,
  } = props.location.state;

  const [isListsListVisible, setIsListsListVisible] = useState(false);
  const [lists, setLists] = useState([]);
  const [isGameOnList, setIsGameOnList] = useState(false);

  useEffect(() => {
    const usersLists = localStorageService.getItem('lists');

    usersLists.forEach((list) => {
      list['games'].forEach((game) => {
        if (game.id === gameID) {
          setIsGameOnList(true);
        }
      });
    });
  }, [gameID]);

  function renderAddOrMoveGameButton() {
    let el

    if (isListsListVisible) {
      if (isGameOnList) {
        el = <ListsList lists={ lists } onClick={ handleMoveGameToListPress } />;
      } else {
        el = <ListsList lists={ lists } onClick={ handleAddToListPress } />;
      }

      el = (
        <>
          { el }
          <button className='button' onClick={ () => setIsListsListVisible(false) }>cancel</button>
        </>
      );
    } else {
      if (isGameOnList) {
        el = <button className='button' onClick={ handleAddOrMoveGamePress }>Move game</button>;
      } else {
        el = <button className='button' onClick={ handleAddOrMoveGamePress }>Add game</button>;
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
      <div className='gameDetail__hero'>
        <img src={ gameCoverUrl } alt={ `${gameName} blurred hero` } />
      </div>
      <BackButton history={ props.history } className='backButton' />
      <div className='gameDetail--main'>
        <div className='gameCoverAndName'>
          <img src={ gameCoverUrl } alt={ `${gameName} cover` } className='gameCover' />
          <h1 className='gameName'>{ gameName }</h1>
        </div>
        <p className='gameSummary'>
          { gameSummary }
        </p>
        <div className='gameDetail__tagsEditor'>
          { isGameOnList ? <TagsEditor tags={ gameTags } gameID={ gameID } /> : null }
        </div>
        { renderAddOrMoveGameButton() }
      </div>
    </div>
  );
}

export default GameDetail;
