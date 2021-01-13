export class RootDirectory {
  directoryItems;

  constructor(data) {
    Object.assign(this, data);

    this.directoryItems = (this.directoryItems || []).map(x => new DirectoryItem(x));
  }
}

export class DirectoryItem {
  path;
  type;
  icon;

  constructor(data) {
    Object.assign(this, data);
  }
}

export class Tag {
  label;
  color;

  constructor(data) {
    Object.assign(this, data);
  }
}

export class PlaylistItem {
  _id;
  album;
  artist;
  diskNumber;
  genre;
  format;
  length;
  path;
  rating;
  tags;
  title;
  trackNumber;
  year;

  // icon;
  // missing = false;

  constructor(data) {
    Object.assign(this, data);
  }
}
export class Playlist {
  _id;
  title;
  path;
  playlistItems;
  image;
  errors;
  inErrorState = false;

  constructor(data) {
    Object.assign(this, data);

    this.playlistItems = (this.playlistItems || []).map(x => new PlaylistItem(x));
  }

  checkValidity() {}

  addItems(items = []) {}

  removeItems(items = []) {}

  delete() {}

  save() {}
}
