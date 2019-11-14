import React, { useState, useEffect } from 'react';
import API from '../api';
import { Link } from 'react-router-dom';
import localStorageService from '../localStorageService';

function ListsList(props) {
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
    <div className='listsList'>
      <h2>Lists</h2>
      <ul>
        { renderLists(lists) }
      </ul>
    </div>
  );
}

function renderLists(lists) {
  if (lists.length > 0) {
    return lists.map((list) => {
      return (
        <li key={ list.id }>
          <Link to={ `/lists/${list.id}` }>
            <div>{ list.name }</div>
            <div>{ list.description }</div>
          </Link>
        </li>
      );
    });
  } else {
    return <p>nothing here</p>
  }
}

export default ListsList;
