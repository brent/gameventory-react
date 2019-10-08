import React from 'react';
import { igdbCoverImgSrcForId } from '../helpers';

function GameSearchResultsRow(props) {
  return (
    <li>
      <img
        src={ igdbCoverImgSrcForId(props.game.igdb_cover_img_id) }
        alt={ props.game.igdb_name + ' cover image' }
      />
      <p>{ props.game.igdb_name }</p>
    </li>
  );
}

export default GameSearchResultsRow;
