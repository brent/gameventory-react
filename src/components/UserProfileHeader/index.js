import React from 'react';

function UserProfileHeader(props) {
  const user = props.user;
  const subNav = props.children;

  return (
    <section>
      <h2>{ user.username }</h2>
      { subNav }
    </section>
  );
}

export default UserProfileHeader;
