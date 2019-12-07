import React, { useState, useEffect } from 'react';
import API from '../../api';
import localStorageService from '../../localStorageService';
import ListsList from '../ListsList';
import BackButton from '../BackButton';
import './index.css';

function UsersLists(props) {
  const localLists = JSON.parse(localStorage.getItem('lists')) || [];
  const [lists, setLists] = useState(localLists);

  useEffect(() => {
    const userID = JSON.parse(localStorage.getItem('user')).id;

    API.getListsForUser({ userID: userID })
      .then((lists) => {
        localStorageService.setItem('lists', lists);
        setLists(lists);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className='usersLists'>
      <BackButton history={ props.history } />
      <h2 className='listTitle'>Lists</h2>
      <ListsList lists={ lists }/>
    </div>
  )
}

export default UsersLists;
