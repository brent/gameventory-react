import React, { useState, useEffect } from 'react';
import axios from 'axios';

import GamesList from './GamesList';

function Profile(props) {
  const [games, setGames] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/users/e086b36f-ecf2-4017-a9a0-f1e4559efc4b/games')
      .then(response => response.data)
      .then(res => setGames(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className='profile'>
      <GamesList games={games} />
    </div>
  );
}

export default Profile;
