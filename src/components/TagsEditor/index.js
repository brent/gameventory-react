import React, { useState } from 'react';
import TagsList from '../TagsList';
import API from '../../api';
import localStorageService from '../../localStorageService';
import './index.css';

function TagsEditor(props) {
  const gameID = props.gameID;
  const userID = localStorageService.getItem('user').id;
  const [isTagInputVisible, setIsTagInputVisible] = useState(false);
  const [tags, setTags] = useState(props.tags);
  const [newTag, setNewTag] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [tagSearchTimeout, setTagSearchTimeout] = useState(null);
  const [tagSearchResults, setTagSearchResults] = useState([]);

  function renderButtonOrInput() {
    let buttonOrInput;

    if (!isTagInputVisible) {
      buttonOrInput = <button className='button' onClick={ handleAddTagButtonPress }>+ tag</button>;
    } else {
      buttonOrInput = (
        <form className='tagsEditorForm' onSubmit={ handleTagAddSubmit }>
          <div>
            <input
              className='tagsEditorForm__input'
              type="text"
              name="newTag"
              value={ newTag }
              onChange={ handleTagAddChange }
            />
            { renderTagSearchResults(tagSearchResults) }
          </div>
          <button className='button' type="submit">add</button>
          <button className='button' onClick={ handleDonePress }>done</button>
        </form>
      );
    }

    return buttonOrInput;
  }

  function renderTagSearchResults(tags) {
    if (newTag !== '' && tags.length > 0) {
      return <TagsList className='tagsEditor__tagsList' tags={tags} onClick={ handleTagAddSubmit } ctaLabel='+' />;
    }
  }

  function handleDonePress(e) {
    e.preventDefault();
    setIsTagInputVisible(false);
  }

  function handleAddTagButtonPress(e) {
    e.preventDefault();
    setIsTagInputVisible(true);
  }

  function handleTagAddSubmit(e, tag=null) {
    e.preventDefault();

    if (!isLoading) {
      setIsLoading(true);
      const tagName = tag ? tag.name : newTag;
      API.addTagToGameForUser({
        tagName: tagName,
        gameID: gameID,
        userID: userID,
      })
        .then((res) => {
          let newTags = tags;
          newTags.push({ id: res.tag_id, name: tagName });
          setTags(newTags);

          setNewTag('');
          setIsLoading(false);
          setIsTagInputVisible(false);
        })
        .catch((err) => console.log(err));
    }
  }

  function handleTagAddChange(e) {
    const tagName = e.target.value.toLowerCase();
    setNewTag(tagName);
    if (tagName === '') {
      clearTimeout(tagSearchTimeout);
      return;
    } else {
      if (tagSearchTimeout || tagSearchTimeout === null) {
        clearTimeout(tagSearchTimeout);
        setTagSearchTimeout(setTimeout(() => {
          setIsLoading(true);
          API.searchForTagByName({ tagName: tagName })
            .then((res) => {
              setIsLoading(false);
              setTagSearchResults(res);
            })
            .catch((err) => console.log(err));
        }, 500));
      }
    }
  }

  function handleTagRemovePress(e, tag) {
    e.preventDefault();

    if (!isLoading) {
      setIsLoading(true);
      API.removeTagFromGameForUser({
        tagID: tag.id,
        gameID: gameID,
      })
        .then((res) => {
          const newTags = tags.filter(t => t.id !== tag.id);
          setTags(newTags);
        setIsLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <div className="tagsEditor">
      <TagsList tags={ tags } onClick={ handleTagRemovePress } ctaLabel="✖" />
      { renderButtonOrInput() }
    </div>
  );
}

export default TagsEditor;
