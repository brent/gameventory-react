import React, { useState, useEffect } from 'react';
import BackButton from './BackButton';
import API from '../api';
import GamesList from './GamesList';

function ListDetail(props) {
  const listID = props.match.params['id'];
  const [list, setList] = useState({
    id: '',
    name: '',
    games: [],
  });

  useEffect(() => {
    const userID = JSON.parse(localStorage.getItem('user')).id;

    API.getGamesInListForUser({
      listID: listID,
      userID: userID,
    })
      .then((games) => {
        const list = {
          id: listID,
          name: '',
          games: games,
        };
        setList(list);
      })
      .catch((err) => console.log(err));
  }, [listID]);

  return (
    <div className="listDetail">
      <BackButton history={ props.history } />

      <h2>{ list.id }</h2>
      <GamesList games={ list.games } />
    </div>
  );
}

export default ListDetail;
