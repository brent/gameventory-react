import React from 'react';
import './index.css';

function UserProfileHeader(props) {
  const user = props.user;
  const subNav = props.children;

  return (
    <section className='userProfileHeader'>
      <div className='userProfileHeader__username--wrapper'>
        <img className='userProfileHeader__avatar' src='user-icon.svg' alt='user avatar' />
        <h2 className='userProfileHeader__username'>{ user.username }</h2>
      </div>
      <div className='userProfileHeader__subNav'>
        { subNav }
      </div>
    </section>
  );
}

export default UserProfileHeader;
