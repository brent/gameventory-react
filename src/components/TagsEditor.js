import React, { useState } from 'react';
import TagsList from './TagsList';
import API from '../api';
import localStorageService from '../localStorageService';

function TagsEditor(props) {
  const gameID = props.gameID;
  const userID = localStorageService.getItem('user').id;
  const [isTagInputVisible, setIsTagInputVisible] = useState(false);
  const [tags, setTags] = useState(props.tags);
  const [newTag, setNewTag] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function renderButtonOrInput() {
    let buttonOrInput;

    if (!isTagInputVisible) {
      buttonOrInput = <button onClick={ handleAddTagButtonPress }>+ tag</button>;
    } else {
      buttonOrInput = (
        <form onSubmit={ handleTagAddSubmit }>
          <input type="text" name="newTag" value={ newTag } onChange={ handleTagAddChange } />
          <button type="submit">add</button>
          <button onClick={ handleDonePress }>done</button>
        </form>
      );
    }

    return buttonOrInput;
  }

  function handleDonePress(e) {
    e.preventDefault();
    setIsTagInputVisible(false);
  }

  function handleAddTagButtonPress(e) {
    e.preventDefault();
    setIsTagInputVisible(true);
  }

  function handleTagAddSubmit(e) {
    e.preventDefault();

    if (!isLoading) {
      setIsLoading(true);
      API.addTagToGameForUser({
        tagName: newTag,
        gameID: gameID,
        userID: userID,
      })
        .then((res) => {
          let newTags = tags;
          newTags.push({ id: res.tag_id, name: newTag });
          setTags(newTags);

          setNewTag('');
          setIsLoading(false);
          setIsTagInputVisible(false);
        })
        .catch((err) => console.log(err));
    } else {
      console.log('debounced press');
    }
  }

  function handleTagAddChange(e) {
    setNewTag(e.target.value);
  }

  return (
    <div className="tagsEditor">
      <TagsList tags={ props.tags } />
      { renderButtonOrInput() }
    </div>
  );
}

export default TagsEditor;
