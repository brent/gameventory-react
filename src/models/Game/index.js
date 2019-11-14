export default class Game {
  constructor(params) {
    this.id = params.id;
    this.igdbID = params.igdbID;
    this.name = params.name;
    this.coverImgID = params.coverImgID;
    this.summary = params.summary;
    this.releaseDate = params.releaseDate;
    this.tags = params.tags;
  }

  static buildFromJSON(json) {
    if (json === null || json === undefined) return;

    const jsonObj = JSON.parse(json);

    return new Game({
      id: jsonObj.id,
      igdbID: jsonObj.igdbID,
      name: jsonObj.name,
      coverImgID: jsonObj.coverImgID,
      summary: jsonObj.summary,
      releaseDate: jsonObj.releaseDate,
      tags: jsonObj.tags,
    });
  }

  static buildListFromJSON(json) {
    if (json === null || json === undefined) return;

    let games = [];

    JSON.parse(json).forEach((gameJSON) => {
      games.push(new Game({
        id: gameJSON.id,
        igdbID: gameJSON.igdbID,
        name: gameJSON.name,
        coverImgID: gameJSON.coverImgID,
        summary: gameJSON.summary,
        releaseDate: gameJSON.releaseDate,
        tags: gameJSON.tags,
      }));
    });

    return games;
  }
}
