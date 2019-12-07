import React, { useState, useEffect } from 'react';
import API from '../../api';
import GamesList from '../GamesList';
import localStorageService from '../../localStorageService';
import UserProfileHeader from '../UserProfileHeader';
import { Link } from 'react-router-dom';
import './index.css';

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
    <div className='profile'>
      <UserProfileHeader user={ user }>
        <ul>
          <li><Link to='/lists'>3 lists</Link></li>
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
        <>
          <h2 className='listTitle'>{ list.name }</h2>
          <GamesList games={ list.games } />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default Profile;
