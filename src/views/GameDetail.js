import React from 'react';
import BackButton from './BackButton';

// TODO: this probably goes when the
// state assignment below goes
function renderTags(tags) {
  return tags.map(tag => {
    return (
      <li 
        key={ tag.tagId } 
        className='gameTag'
      >{ tag.tagName }</li>
    );
  });
}

function GameDetail(props) {
  // TODO: move this out of component
  const {
    gameName,
    gameCoverUrl,
    gameTags,
    gameSummary,
  } = props.location.state;

  return (
    <div className='gameDetail'>
      <BackButton history={ props.history } />

      <img src={ gameCoverUrl } alt={ `${gameName} cover` } />
      <h1>{ gameName }</h1>
      <p className='gameSummary'>
        { gameSummary }
      </p>
      <ul className='gameTags'>
        { renderTags(gameTags) }
      </ul>
    </div>
  );
}

export default GameDetail;
