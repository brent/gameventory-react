import React from 'react';

function GamesList(props) {
  return (
    <div className='gamesList'>
      <ul>
        { props.games }
      </ul>
    </div>
  );
}

export default GamesList;
