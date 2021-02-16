import DataStore from 'nedb';
import sqlite from 'sqlite3';
import {
  app
} from 'electron';

//#region sqlite
let db = new sqlite.Database(`${app.getPath('appData')}\\playlister\\db\\app.db`, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to SQLite db');
});
//#endregion

// npm i sqlite3 --build-from-source --runtime=electron --target=9.4.3 --dist-url=https://electronjs.org/headers

let instance = null;

export const datastore = {
  getInstance() {
    if (instance) return instance;

    instance = {
      playlists: new DataStore({
        filename: `${app.getPath('appData')}\\playlister\\db\\playlists.db`,
        autoload: true
      }),
      songs: new DataStore({
        filename: `${app.getPath('appData')}\\playlister\\db\\songs.db`,
        autoload: true
      }),
      stats: new DataStore({
        filename: `${app.getPath('appData')}\\playlister\\db\\stats.db`,
        autoload: true
      }),
      settings: new DataStore({
        filename: `${app.getPath('appData')}\\playlister\\db\\settings.db`,
        autoload: true
      }),
    }

    return instance;
  },
}
