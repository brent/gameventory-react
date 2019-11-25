import Game from '../Game';

export default class List {
  constructor(params) {
    this.id = params.id;
    this.name = params.name;
    this.description = params.description;
    this.games = ((games) => {
      if (typeof games === 'undefined'
        || games.length <= 0) {
        return [];
      }

      let gamesArray = [];
      params.games.forEach((game) => {
        gamesArray.push(new Game({
          id: game.id,
          igdbID: game.igdb_id,
          name: game.igdb_name,
          coverImgID: game.igdb_cover_img_id,
          summary: game.igdb_summary,
          releaseDate: game.igdb_first_release_date,
          tags: game.tags,
        }));
      });

      return gamesArray;
    })(params.games);
  }
}
