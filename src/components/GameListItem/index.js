import React from 'react';
import { igdbCoverImgSrcForId } from '../../helpers';
import TagsList from '../TagsList';
import './index.css';

function GameListItem(props) {
  return (
    <li className='gamesListItem'>
      <div className='gamesListItem__coverImg--wrapper'>
        <img
          className='gamesListItem__coverImg'
          src={ igdbCoverImgSrcForId(props.game.coverImgID) }
          alt={ props.game.name + ' cover image' }
        />
      </div>
      <div className='gamesListItem__meta'>
        <p className='gamesListItem__gameName'>{ props.game.name }</p>
        <TagsList tags={ props.game.tags } />
      </div>
    </li>
  );
}

export default GameListItem;
