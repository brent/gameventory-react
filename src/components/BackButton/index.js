import React from 'react';
import './index.css';

function BackButton(props) {
  return (
    <div className='backButton'>
      <button onClick={ () => props.history.goBack() }>← back</button>
    </div>
  );
}

export default BackButton;
