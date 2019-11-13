import React, { useState, useEffect } from 'react';
import API from '../api';
import { Link } from 'react-router-dom';

function ListsList(props) {
  const localLists = JSON.parse(localStorage.getItem('lists')) || [];
  const [lists, setLists] = useState(localLists);

  useEffect(() => {
    const userID = JSON.parse(localStorage.getItem('user')).id;

    API.getListsForUser({ userID: userID })
      .then((lists) => {
        localStorage.setItem('lists', JSON.stringify(lists));
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
            { list.name }
          </Link>
        </li>
      );
    });
  } else {
    return <p>nothing here</p>
  }
}

export default ListsList;
