import axios from './axiosConfig';
import Game from '../models/Game';
import Tag from '../models/Tag';
import List from '../models/List';

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
                  name: tag.name,
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

  static addGameToListForUser(params) {
    const { userID, listID, gameID } = params;

    let requestParams = new URLSearchParams();
    requestParams.append('userID', userID);
    requestParams.append('gameID', gameID);

    return new Promise((resolve, reject) => {
      axios.patch(`/lists/${listID}`, requestParams)
        .then((res) => res.data)
        .catch((err) => reject(new Error('failed to add game to list')));
    });
  }

  static addGameToUser(params) {
    const { userID, gameID } = params;

    let requestParams = new URLSearchParams();
    requestParams.append('userID', userID);
    requestParams.append('gameID', gameID);

    return new Promise((resolve, reject) => {
      axios.post('/users/games/', requestParams)
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

  static getListsForUser(params) {
    const { userID } = params;

    return new Promise((resolve, reject) => {
      axios.get(`/users/${userID}/lists`)
        .then((res) => {
          const lists = [];

          res.data.forEach((list) => {
            lists.push(new List({
              id: list.id,
              name: list.name,
              description: list.list_description,
              games: list.games,
            }));
          });

          resolve(lists);
        })
        .catch((err) => reject(err));
    });
  }

  static getListForUser(params) {
    const { listRef, userID } = params;

    return new Promise((resolve, reject) => {
      axios.get(`/users/${userID}/lists/${listRef}`)
        .then((res) => {
          let games = [];

          res.data.games.forEach((game) => {
            let tags = [];

            if (game.tags) {
              game.tags.forEach((tag) => {
                tags.push(new Tag({
                  id: tag.id,
                  name: tag.name,
                }));
              });
            }

            games.push(game);
          });

          resolve(new List({
            id: res.data.id,
            name: res.data.name,
            description: res.data.list_description,
            games: games,
          }));
        })
        .catch((err) => reject(err));
    });
  }

  static addTagToGameForUser(params) {
    const { tagName, gameID, userID } = params;

    let requestParams = new URLSearchParams();
    requestParams.append('tagName', tagName);
    requestParams.append('userID', userID);
    requestParams.append('gameID', gameID);

    return new Promise((resolve, reject) => {
      axios.post('/tags', requestParams)
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }
}
