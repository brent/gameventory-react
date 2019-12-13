import React from 'react';
import './index.css';

function TagsList(props) {
  const tags = props.tags || null;

  function renderTags(tags) {
    if (tags === undefined ||
        tags === null ||
        tags.length === 0)
      return null;

    const tagsList = tags.map(tag => (
      <li 
        key={ tag.id }
        className={ props.onClick ? 'gameTagButton' : 'gameTag' }
        onClick={ (e) => props.onClick(e, tag) }
      >
        { tag.name }
        { props.onClick
            ? <button className='gameTag__button'> { props.ctaLabel } </button>
            : null
        }
      </li>
    ));

    return (
      tagsList.length > 0
      ? (
        <div className='gameTags'>
          { props.onClick
              ? null
              : <img className='gameTags__icon' src='/tags-list-icon.svg' alt='' />
          }
          <ul className='gameTags__list'>
            { tagsList }
          </ul>
        </div>
      )
      : false
    );
  }

  return renderTags(tags);
}

export default TagsList;
