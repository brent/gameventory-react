import React from 'react';
import { igdbCoverImgSrcForId } from '../helpers';

function renderTags(tags) {
  if (tags === undefined || 
      tags === null || 
      tags.length === 0)
    return null;

  const tagsList = tags.map(tag => (
    <li key={ tag.id } className="tag">
      { tag.name }
    </li>
  ));

  return (
    tagsList.length > 0
    ? (
      <ul className='gameTags'>
        { tagsList }
      </ul>
    ) : false
  );
}

function GameListItem(props) {
  return (
    <li>
      <img
        src={ igdbCoverImgSrcForId(props.game.coverImgID) }
        alt={ props.game.name + ' cover image' }
      />
      <p>{ props.game.name }</p>
      { renderTags(props.game.tags) }
    </li>
  );
}

export default GameListItem;
