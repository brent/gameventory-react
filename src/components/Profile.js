import React, { useState, useEffect } from 'react';
import API from '../api';
import GamesList from './GamesList';
import localStorageService from '../localStorageService';

function renderPlayingListFromLists(list) {
  return (
    <div className='profile'>
      { typeof list !== 'undefined' ? (
        <div>
          <h2>{ list.name }</h2>
          <GamesList games={ list.games } />
      </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

function Profile(props) {
  const [playingList, setPlayingList] = useState();

  useEffect(() => {
    const userID = localStorageService.getItem('user').id;

    API.getListsForUser({ userID: userID })
      .then((lists) => {
        localStorageService.setItem('lists', lists);
        const playingList = lists.find((list) => list.name === 'Playing')
        setPlayingList(playingList);
      })
      .catch((err) => console.log(err));

  }, []);

  return renderPlayingListFromLists(playingList);
}

export default Profile;
