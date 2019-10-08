import React from 'react';

function renderTags(tags) {
  if (tags === null) return null;

  return tags.map(tag => {
    return(
      <li key={ tag.tagId } className="tag">
        { tag.tagName }
      </li>
    );
  });
}

function GameRow(props) {
  return (
    <li key={ props.gameId }>
      <img
        src={ 'http:' + props.gameCoverUrl }
        alt={ props.gameName + ' cover' }
      />
      <p>{ props.gameName }</p>
      <ul className="tags">
        { renderTags(props.tags) }
      </ul>
    </li>
  );
}

export default GameRow;
