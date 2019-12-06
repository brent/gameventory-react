import React, { useState, useEffect } from 'react';
import BackButton from '../BackButton';
import API from '../../api';
import GamesList from '../GamesList';
import localStorageService from '../../localStorageService';

function ListDetail(props) {
  const listID = props.match.params['id'];
  const [list, setList] = useState({
    id: '',
    name: '',
    games: [],
  });

  useEffect(() => {
    const userID = localStorageService.getItem('user').id;

    API.getListForUser({
      listRef: listID,
      userID: userID,
    })
      .then((list) => {
        setList(list);
      })
      .catch((err) => console.log(err));
  }, [listID]);

  return (
    <div className="listDetail">
      <BackButton history={ props.history } />

      <h2>{ list.name }</h2>
      <h3>{ list.description }</h3>
      <GamesList games={ list.games } />
    </div>
  );
}

export default ListDetail;
