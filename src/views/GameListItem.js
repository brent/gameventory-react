import React from 'react';
import { igdbCoverImgSrcForId } from '../helpers';

function renderTags(tags) {
  if (tags === undefined || 
      tags === null || 
      tags.length === 0)
    return null;

  return tags.map(tag => (
    <li key={ tag.id } className="tag">
      { tag.tag_name }
    </li>
  ));
}

function GameListItem(props) {
  return (
    <li>
      <img
        src={ igdbCoverImgSrcForId(props.game.igdb_cover_img_id) }
        alt={ props.game.igdb_name + ' cover image' }
      />
      <p>{ props.game.igdb_name }</p>
      <ul className="tags">
        { renderTags(props.game.tags) }
      </ul>
    </li>
  );
}

export default GameListItem;
