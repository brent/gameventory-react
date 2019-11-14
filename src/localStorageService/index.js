import Game from '../models/Game';

class LocalStorageService {
  getItem(string) {
    if (string.match(/^games/)) {
      const gamesData = localStorage.getItem(string);
      const gamesArray = Game.buildListFromJSON(gamesData);
      return gamesArray;
    }

    return JSON.parse(localStorage.getItem(string));
  }

  setItem(string, data) {
    const JSONdata = JSON.stringify(data);
    localStorage.setItem(string, JSONdata);
  }
}

const ls = new LocalStorageService();
Object.freeze(ls);

export default ls;
