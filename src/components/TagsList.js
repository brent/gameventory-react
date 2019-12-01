import React from 'react';

function TagsList(props) {
  const tags = props.tags || null;

  function renderTags(tags) {
    if (tags === undefined ||
        tags === null ||
        tags.length === 0)
      return null;

    const tagsList = tags.map(tag => (
      <li key={ tag.id } className='gameTag'>
        { tag.name }
        { props.onClick
            ? <button onClick={ (e) => props.onClick(e, tag) }> X </button>
            : null
        }
      </li>
    ));

    return (
      tagsList.length > 0
      ? (
          <ul className='gameTags'>
            { tagsList }
          </ul>
      )
      : false
    );
  }

  return renderTags(tags);
}

export default TagsList;
