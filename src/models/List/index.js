export default class List {
  constructor(params) {
    this.id = params.id;
    this.name = params.name;
    this.description = params.description;
    this.games = params.games || [];
  }
}
