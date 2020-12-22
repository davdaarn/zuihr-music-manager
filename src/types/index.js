export class DirectoryItem {
  path;
  type;
  icon;

  constructor(data) {
    Object.assign(this, data);
  }
}

export class PlaylistItem {
  path;
  type;
  icon;
  missing = false;

  constructor(data) {
    Object.assign(this, data);


  }
}

export class Playlist {
  playlistItems;
  errors;
  inErrorState = false;

  constructor(data) {
    Object.assign(this, data);

    this.playlistItems = (this.properties || []).map(x => new PlaylistItem(x));
  }

  checkValidity() {}
}
