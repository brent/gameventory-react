import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <div className='appNav'>
      <ul className='appNav__links'>
        <li><Link to='/'>Profile</Link></li>
        <li><Link to='/search'>Search</Link></li>
        <li><Link to='/logout'>Log out</Link></li>
      </ul>
    </div>
  );
}

export default Navigation;
