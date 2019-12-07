import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

function Navigation() {
  return (
    <div className='appNav'>
      <ul className='appNav__links'>
        <li className='appNav__links--profile'><Link to='/'>Profile</Link></li>
        <li className='appNav__links--search'><Link to='/search'>Search</Link></li>
        <li className='appNav__links--settings'><Link to='/logout'>Settings</Link></li>
      </ul>
    </div>
  );
}

export default Navigation;
