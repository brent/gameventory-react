import React from 'react';
import { igdbCoverImgSrcForId } from '../helpers';
import TagsList from './TagsList';

function GameListItem(props) {
  return (
    <li>
      <img
        src={ igdbCoverImgSrcForId(props.game.coverImgID) }
        alt={ props.game.name + ' cover image' }
      />
      <p>{ props.game.name }</p>
      <TagsList tags={ props.game.tags } />
    </li>
  );
}

export default GameListItem;
