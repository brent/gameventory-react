import React from 'react';

function ListsList(props) {
  const lists = props.lists;

  function renderLists(lists) {
    if (lists.length > 0) {
      return lists.map((list) => {
        return (
          <li key={ list.id } onClick={ () => props.onClick(list.id) }>
            <div>{ list.name }</div>
            <div>{ list.description }</div>
          </li>
        );
      });
    } else {
      return <p>nothing here</p>
    }
  }

  return (
    <ul>
      { renderLists(lists) }
    </ul>
  );
}

export default ListsList;
