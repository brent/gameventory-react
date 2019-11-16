import React, { useState, useEffect } from 'react';
import API from '../api';
import { Link } from 'react-router-dom';
import localStorageService from '../localStorageService';
import ListsList from './ListsList';

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

  function navigateToDetail(listID) {
    props.history.push(`/lists/${listID}`);
  }

  return (
    <div className='listsList'>
      <h2>Lists</h2>
      <ListsList lists={ lists } onClick={ navigateToDetail } />
    </div>
  )
}

export default UsersLists;
