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
}
