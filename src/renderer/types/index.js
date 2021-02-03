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

export class Song {
  id;
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
  thumbnail;

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
  Songs;
  image;
  errors;
  inErrorState = false;

  constructor(data) {
    Object.assign(this, data);

    this.Songs = (this.Songs || []).map(x => new Song(x));
  }

  checkValidity() {}

  addItems(items = []) {}

  removeItems(items = []) {}

  delete() {}

  save() {}
}

export class SongContainer {
  _id;
  songs;

  constructor(data) {
    Object.assign(this, data);
  }
}

export const playerState = {
  stopped: 0,
  paused: 1,
  playing: 2
}
