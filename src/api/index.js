import axios from 'axios';

import Game from '../models/Game';
import Tag from '../models/Tag';

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
        .then(res => {
          let games = [];

          res.data.forEach((game) => {
            let tags = [];

            if (game.tags) {
              game.tags.forEach((tag) => {
                tags.push(new Tag({
                  id: tag.id,
                  name: tag.tag_name,
                }));
              });
            }

            games.push(new Game({
              id: game.id,
              igdbID: game.igdb_id,
              name: game.igdb_name,
              coverImgID: game.igdb_cover_img_id,
              summary: game.igdb_summary,
              releaseDate: game.igdb_first_release_date,
              tags: tags,
            }));
          });

          resolve(games);
        })
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
      .then(res => resolve(res.data))
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
        .then(res => {
          let games = [];

          res.data.forEach((game) => {
            games.push(new Game({
              id: game.id,
              igdbID: game.igdb_id,
              name: game.igdb_name,
              coverImgID: game.igdb_cover_img_id,
              summary: game.igdb_summary,
              releaseDate: game.igdb_first_release_date,
              tags: game.tags,
            }));
          });

          resolve(games);
        })
        .catch(err => reject(err));
    });
  }
}
