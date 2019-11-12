import React from 'react';
import { Link } from 'react-router-dom';

import './App.css';
import Index from './routes/Index';

function App() {
  return (
    <div className='app'>
      <Index> 
        <div className='appNav'>
          <ul className='appNav__links'>
            <li><Link to='/'>Profile</Link></li>
            <li><Link to='/lists'>Lists</Link></li>
            <li><Link to='/search'>Search</Link></li>
            <li><Link to='/login'>Log in</Link></li>
            <li><Link to='/logout'>Log out</Link></li>
          </ul>
        </div>
      </Index>
    </div>
  );
}

export default App;
