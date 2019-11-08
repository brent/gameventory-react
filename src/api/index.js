import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/v1/';
const POST_HEADERS = {
  'Content-Type': 'application/x-www-form-urlencoded',
};

axios.interceptors.response.use((response) => {
    return response;
  },
  (error) => {
    const resErr = error.response.data.error;
    if (resErr.statusCode !== 401) {
      return Promise.reject(error);
    }

    const refreshToken = localStorage.getItem('refresh');
    let params = new URLSearchParams();
    params.append('refreshToken', refreshToken);

    axios({
      method: 'POST',
      baseURL: BASE_URL,
      url: '/auth/token',
      headers: POST_HEADERS,
      data: params
    })
    .then(res => {
      localStorage.setItem('access', res.data.token);
    })
    .catch(err => console.log(err));
  }
);

export default class API {
  static getGamesForUser(params) {
    const { userID, token } = params;

    return new Promise((resolve, reject) => {
      axios({
        method: 'GET',
        baseURL: BASE_URL,
        url: `/users/${userID}/games`,
        params: {
          'auth': token,
        }
      })
      .then(res => resolve(res.data))
      .catch(err => reject(err));
    });
  }

  static addGameToUser(params) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'POST',
        baseURL: BASE_URL,
        url: '/users/games/',
        headers: POST_HEADERS,
        data: params
      })
        .then(res => res.data)
        .catch(err => reject(new Error('failed to add game')));
    });
  }

  static logUserIn(params) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'POST',
        baseURL: BASE_URL,
        url: '/auth/login',
        headers: POST_HEADERS,
        data: params
      })
      .then(res => res.data)
      .catch(err => reject(err));
    });
  }

  static findGameByName(params) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        baseURL: BASE_URL,
        url: '/games/search', 
        headers: POST_HEADERS,
        data: params
      })
      .then(res => resolve(res.data))
      .catch(err => reject(err));
    });
  }
}
