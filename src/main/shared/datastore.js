import DataStore from 'nedb';
import {
  app
} from 'electron';

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
      songs: new DataStore({
        filename: `${app.getPath('appData')}\\playlister\\db\\stats.db`,
        autoload: true
      }),
    }

    return instance;
  },
}
