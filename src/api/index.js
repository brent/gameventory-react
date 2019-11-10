import axios from './axiosConfig';
import Game from '../models/Game';
import Tag from '../models/Tag';

export default class API {
  static getGamesForUser(params) {
    const { userID } = params;

    return new Promise((resolve, reject) => {
      axios.get(`/users/${userID}/games`)
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
      axios.post('/users/games/', params)
        .then(res => res.data)
        .catch(err => reject(new Error('failed to add game')));
    });
  }

  static logUserIn(params) {
    return new Promise((resolve, reject) => {
      axios.post('http://localhost:3000/api/v1/auth/login', params)
        .then(res => resolve(res.data))
        .catch(err => {
          reject(new Error('failed to log in'))
        });
    });
  }

  static findGameByName(params) {
    return new Promise((resolve, reject) => {
      axios.post('/games/search', params)
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
