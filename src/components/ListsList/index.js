import React from 'react';
import { Link } from 'react-router-dom';

function ListsList(props) {
  const lists = props.lists;

  function renderLists(lists) {
    if (lists.length > 0) {
      return lists.map((list) => {
        let listItem;

        if (props.onClick) {
          listItem = (
            <li key={ list.id } onClick={ (e) => props.onClick(list.id) }>
              <a href="">
                <div>{ list.name }</div>
                <div>{ list.description }</div>
              </a>
            </li>
          );
        } else {
          listItem = (
            <li key={ list.id }>
              <Link to={`/lists/${list.id}`}>
                <div>{ list.name }</div>
                <div>{ list.description }</div>
              </Link>
            </li>
          );
        }

        return listItem;
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
