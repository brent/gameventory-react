import React, { useState, useEffect } from 'react';
import API from '../../api';
import GamesList from '../GamesList';
import localStorageService from '../../localStorageService';
import UserProfileHeader from '../UserProfileHeader';
import { Link } from 'react-router-dom';

function Profile(props) {
  const [playingList, setPlayingList] = useState();
  const user = localStorageService.getItem('user');

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

  return (
    <div>
      <UserProfileHeader user={ user }>
        <ul>
          <li><Link to='/lists'>Lists</Link></li>
        </ul>
      </UserProfileHeader>
      { renderPlayingListFromLists(playingList) }
    </div>
  );
}

function renderPlayingListFromLists(list) {
  return (
    <div>
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

export default Profile;
