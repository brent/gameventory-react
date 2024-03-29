import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import API from '../../api';
import './index.css';

function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (localStorage.getItem('refresh')) {
      return true;
    }
    return false;
  });

  function handleUsernameChange(e) {
    const username = e.target.value;
    setUsername(username);
  }

  function handlePasswordChange(e) {
    const password = e.target.value;
    setPassword(password);
  }

  function handleLoginSubmit(e) {
    let params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);

    API.logUserIn(params)
      .then((res) => {
        const userData = JSON.stringify(res['user']);
        saveDataToLocalStorage('user', userData);
        saveDataToLocalStorage('access', res['access']);
        saveDataToLocalStorage('refresh', res['refresh']);
        setIsLoggedIn(true);
      })
      .catch((err) => console.log(err));

    e.preventDefault();
  }

  function saveDataToLocalStorage(key, data) {
    localStorage.setItem(key, data);
  }

  return (
    isLoggedIn
    ? (<Redirect to="/" />)
    : (
      <div className='login'>
        <img className='logo' src='/app-icon.svg' alt='Gameventory logo' />
        <form className='login__form' onSubmit={ handleLoginSubmit }>
          <input type='text' value={ username } onChange={ handleUsernameChange } placeholder='Username' />
          <input type='password' value={ password } onChange={ handlePasswordChange } placeholder='Password' />
          <button onClick={ handleLoginSubmit }>Log in</button>
        </form>
      </div>
    )
  );
}

export default Login;
