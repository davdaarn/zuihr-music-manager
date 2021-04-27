const {
  app,
  ipcMain,
  webContents
} = require('electron');

const {
  Worker
} = require('worker_threads');

const fs = require('fs');
const path = require('path');
const os = require('os');
const chalk = require('chalk');
const mm = require('music-metadata');
const sharp = require('sharp');
const util = require('util');
const Vibrant = require('node-vibrant');
const buffer = require('buffer');

import {
  datastore
} from '../../shared/datastore'


const db = datastore.getInstance();

import {
  mainAppWindow
} from '../../shared/mainAppWindow';

let win = null;

app.on('browser-window-created', () => {
  console.log('browser window created...')
  // win = mainAppWindow.getInstance();
})

let songsToProcess = [];
let processingSongs = false;
let processingSongNumber = 0;
let duplicateSongs = 0;
let songsAlreadyInLibrary = 0;
let songsAdded = 0;

// watchdog
let watcher = setInterval(() => {
  // console.log('watcher');
  if (songsToProcess.length > 0 && !processingSongs) {
    processingSongs = true;
    win.webContents.send('PROCESSING_SONGS', processingSongs);
    console.log(chalk.redBright('starting'), Date());
    processSongs();
  }
}, 1000);

const processSongs = () => {
  if (!win) {
    win = mainAppWindow.getInstance();
  }
  if (songsToProcess.length > 0) {
    processingSongNumber++;
    win.webContents.send('PROCESSING_SONG_NUMBER', processingSongNumber);
    const p = songsToProcess.pop();




    // todo song creation should not be aborted if album art is bad
    (async () => {
      try {

        //#region create song object
        let colorPalette = {
          Vibrant: {
            hex: '#232323',
            rgb: [35, 35, 35],
          },
          DarkVibrant: {
            hex: '#232323',
            rgb: [35, 35, 35],
          },
          LightVibrant: {
            hex: '#383838',
            rgb: [56, 56, 56],
          },
          Muted: {
            hex: '#232323',
            rgb: [35, 35, 35],
          },
          DarkMuted: {
            hex: '#232323',
            rgb: [35, 35, 35],
          },
          LightMuted: {
            hex: '#383838',
            rgb: [56, 56, 56],
          }
        };

        const metadata = await mm.parseFile(p, {
          skipCovers: false
        });
        const {
          common,
          format
        } = metadata;

        // const cover = false;
        const cover = await mm.selectCover(common.picture);

        let image64 = null;
        let image256 = null;

        if (cover) {
          image64 = await (await sharp(cover.data).resize(64, 64, {}).jpeg().toBuffer()).toString('base64');
          image256 = await (await sharp(cover.data).resize(256, 256, {}).jpeg().toBuffer()).toString('base64');

          await Vibrant.from(cover.data).maxColorCount(20).getPalette().then(palette => {
            // console.log(palette);
            let tempPalette = {}
            Object.keys(palette).forEach(key => {
              tempPalette[key] = {
                hex: palette[key].hex,
                rgb: palette[key].rgb,
              }
            });
            // console.log(tempPalette);
            colorPalette = tempPalette;
          });

        }

        if (!cover || !image64 || !image256) {
          let imagePath64 = path.join(__static, '/placeholder64.jpg');
          let imagePath256 = path.join(__static, '/placeholder256.jpg');
          // console.log(imagePath64);

          image64 = fs.readFileSync(imagePath64, {
            encoding: 'base64'
          });
          image256 = fs.readFileSync(imagePath256, {
            encoding: 'base64'
          });

          // console.log(file64)

          // image64 = await (await sharp(file64).resize(64, 64, {}).jpeg().toBuffer()).toString('base64');
          // image256 = await (await sharp(file256).resize(256, 256, {}).jpeg().toBuffer()).toString('base64');

          // await Vibrant.from(image256).getPalette().then(palette => {
          //   console.log(palette);

          //   Object.keys(palette).forEach(key => {
          //     tempPalette[key] = {
          //       hex: palette[key].hex,
          //       rgb: palette[key].rgb,
          //     }
          //   });
          //   // console.log(tempPalette);
          //   colorPalette = tempPalette;
          // }).catch(error => {
          //   console.log(error);
          // });
        }


        const album = common.album ? common.album : '';
        const artist = common.artist ? common.artist : '';
        const diskNumber = common.disk ? common.disk : '';
        const genre = common.genre ? common.genre : '';
        // format, // to be determined
        const length = format.duration ? format.duration : '';
        // const path = p;
        const rating = 0;
        const tags = [];
        // Todo: if title is bad, use path to get title
        const title = common.title ? common.title : '';
        const trackNumber = common.track ? common.track : '';
        const year = common.year ? common.year : '';
        const albumArt = {
          format: cover ? cover.format : null,
          image64: image64 ? image64 : null,
          image256: image256 ? image256 : null,
        }

        // Todo: better id generation. Maybe remove spaces to simplify search process
        const uid = `${title}${album}${artist}`;

        const song = {
          id: uid,
          album,
          albumArt,
          artist,
          colorPalette,
          diskNumber,
          genre,
          path: p,
          length,
          rating,
          tags,
          title,
          trackNumber,
          year
        };
        //#endregion

        // todo: make function // processNewSong(song);
        // * 1 - check if song exists in db
        db.songs.find({
          _id: uid
        }, (err, docs) => {
          if (err) {
            console.warn(err);
          } else if (docs.length > 1) {
            console.error("Entities should have unique id's"); // this should never happen
          } else if (docs.length === 1) {
            /**
             ** 1.2 - if song is not unique but has a different path
             ** add song as duplicate
             */
            const exists = docs[0].songs.some(x => x.path === song.path); // check for existing file path
            if (!exists) {
              db.songs.update({
                  _id: uid
                }, {
                  $push: {
                    songs: song
                  }
                },
                (err, numEffected, param3, param4) => {
                  if (err) {
                    console.error('db error updating song', err);
                  } else if (numEffected === 0 || numEffected > 1) {
                    console.error('Error updating document'); // Something went wrong
                  } else {
                    duplicateSongs++;
                    win.webContents.send('SET_DUPLICATE_SONG_COUNT', duplicateSongs);
                    processSongs();
                  }
                }
              );
            } else {
              console.warn('song already in library');
              songsAlreadyInLibrary++
              win.webContents.send('setExistingSongCount', songsAlreadyInLibrary);
              processSongs();
            }
            // processSongs();
          } else {
            // insert new doc
            const songContainer = {
              _id: uid,
              songs: [song]
            };
            db.songs.insert(songContainer, (err, newDoc) => {
              if (err) {
                console.error('this should not be happening', err);
              } else {
                songsAdded++;
                win.webContents.send('SET_SONGS_ADDED_COUNT', songsAdded);
                processSongs();
              }
            });
          }
        });
      } catch (err) {
        console.error(err.message);
        processingSongs = false;
      }
    })();
  } else {
    console.log(chalk.redBright('exiting'), Date());
    win.webContents.send('SET_PROCESSING_COMPLETE_SUMMARY', {
      songsAdded,
      duplicateSongs,
      songsToProcess: songsToProcess.length,
      processingSongs,
      processingSongNumber,
      songsAlreadyInLibrary,
    });

    songsAdded = 0;
    duplicateSongs = 0;
    songsToProcess = [];
    processingSongs = false;
    processingSongNumber = 0;
    songsAlreadyInLibrary = 0;

    win.webContents.send('PROCESSING_SONGS', processingSongs);
    win.webContents.send('SET_SONGS_ADDED_COUNT', songsAdded);
    win.webContents.send('SET_DUPLICATE_SONG_COUNT', duplicateSongs);
    win.webContents.send('SET_SONGS_TO_PROCESS_COUNT', songsToProcess.length);
    win.webContents.send('PROCESSING_SONG_NUMBER', processingSongNumber);
    win.webContents.send('SET_EXISTING_SONG_COUNT', songsAlreadyInLibrary);

    win.webContents.send('SET_IS_LIBRARY_DIRTY', true);

  }
}

function runService(workerData) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./src/main/workers/discoveryWorker.js', {
      workerData
    });

    worker.on('message', (data) => {
      console.log(data);
      win.webContents.send('SONGS_TO_PROCESS_COUNT', data.filePaths.length);
      if (data.filePaths.length < 1 && songsToProcess.length < 1) {
        win.webContents.send('PROCESSING_SONGS', processingSongs);
        return resolve('Nothing to process');
      } else {
        songsToProcess.push(...data.filePaths);
        return resolve(`Added ${data.filePaths.length} songs to process`);
      }
    });
    worker.on('error', (data) => {
      console.log(data);
      // todo: send error here
      return reject('oh snap!!!');
    });
    worker.on('exit', code => {
      if (code !== 0) {
        reject(new Error(`Worker Thread stopped with exit code: ${code}`));
      } else {
        console.log(chalk.green('all done'));
      }
    });
  })
}

ipcMain.handle('FIND_SONGS', async (event, args) => {
  if (!win) {
    win = mainAppWindow.getInstance();
  }
  win.webContents.send('PROCESSING_SONGS', true);
  runService(args).then(x => {
    console.log('FIND_SONGS', x);
  }).catch(err => {
    console.log('FIND_SONGS', err);
  });
})

// todo: prevent this from locking up the UI
ipcMain.handle('LOAD_LIBRARY', async (even, args) => {
  let res = 'poo';
  res = await new Promise((resolve, reject) => {
    db.songs.find({}, (err, docs) => {
      if (err) {
        return reject(err);
      } else {
        if (!win) {
          win = mainAppWindow.getInstance();
        }
        win.webContents.send('SET_IS_LIBRARY_DIRTY', false);
        return resolve(docs);
      }
    });
  })

  return res;
})

ipcMain.handle('SET_SONG_RATING', async (event, args) => {
  console.log(args.args.id);
  let res = 'poo';

  res = await new Promise((resolve, reject) => {
    db.songs.findOne({
      _id: args.args.id
    }, (err, doc) => {
      if (err) {
        console.error(err);
        return reject(err);
      } else {
        doc.songs[0].rating = args.args.rating;
        db.songs.update({
          _id: args.args.id
        }, {
          songs: doc.songs
        }, (err, numReplaced) => {
          if (err) {
            console.log(err);
            return reject(err);
          } else {
            // if (!win) {
            //   win = mainAppWindow.getInstance();
            // }
            // win.webContents.send('SET_IS_LIBRARY_DIRTY', false);
            console.log(numReplaced);
            return resolve(numReplaced);
          }
        });
      }
    });

  })

  return res;
})

ipcMain.handle('SET_AS_FAVORITE', async (event, args) => {
  console.log(args.args.id);
  let res = 'poo';

  res = await new Promise((resolve, reject) => {
    db.songs.findOne({
      _id: args.args.id
    }, (err, doc) => {
      if (err) {
        console.error(err);
        return reject(err);
      } else {
        doc.songs[0].favorite = args.args.favorite;
        db.songs.update({
          _id: args.args.id
        }, {
          songs: doc.songs
        }, (err, numReplaced) => {
          if (err) {
            console.log(err);
            return reject(err);
          } else {
            // if (!win) {
            //   win = mainAppWindow.getInstance();
            // }
            // win.webContents.send('SET_IS_LIBRARY_DIRTY', false);
            console.log(numReplaced);
            return resolve(numReplaced);
          }
        });
      }
    });

  })

  return res;
})
