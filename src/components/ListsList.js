import React from 'react';
import { Link } from 'react-router-dom';

function ListsList(props) {
  const lists = props.lists;

  function renderLists(lists) {
    if (lists.length > 0) {
      return lists.map((list) => {
        return (
          <li key={ list.id }>
            <Link to={`/lists/${list.id}`}>
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

  return (
    <ul className="listsList">
      { renderLists(lists) }
    </ul>
  );
}

export default ListsList;
