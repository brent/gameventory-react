import React from 'react';

function GamesSearchBar(props) {
  return (
    <div className='gamesSearchBar'>
      <input type='text' 
        value={ props.value } 
        onChange={ props.onChange } 
      />
    </div>
  );
}

export default GamesSearchBar;
