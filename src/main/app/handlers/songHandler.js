const {
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

const buffer = require('buffer');

import {
  datastore
} from '../../shared/datastore'

const db = datastore.getInstance();

import {
  mainAppWindow
} from '../../shared/mainAppWindow';

let win = null;

let songsToProcess = [];
let processingSongs = false;

// watchdog
let watcher = setInterval(() => {
  // console.log('watcher');
  if (songsToProcess.length > 0 && !processingSongs) {
    processingSongs = true;
    console.log(chalk.redBright('starting'), Date());
    processSongs();
  }
}, 1000);

const processSongs = () => {
  if (songsToProcess.length > 0) {

    const p = songsToProcess.pop();

    (async () => {
      try {
        const metadata = await mm.parseFile(p, {
          skipCovers: false
        });
        const {
          common,
          format
        } = metadata;

        // const cover = false;
        const cover = await mm.selectCover(common.picture);
        // console.log(cover);

        let newImage = null;
        let largeImage = null;

        if (cover) {
          newImage = await (await sharp(cover.data).resize(64, 64, {}).jpeg().toBuffer()).toString('base64');
          largeImage = await (await sharp(cover.data).resize(64, 64, {}).jpeg().toBuffer()).toString('base64');

          // console.log(newImage)
          // console.log(newImage.buffer)

          // console.log('here!!!!!!!!!!!!!!!!')
          // console.log(newImage.buffer.toString('base64'));

          // newImage = [...newImage];
          // console.log(newImage);

          // newImage = newImage.toString('base64');
          // console.log(newImage);
        }
        // else {
        //   newImage = await sharp({
        //       create: {
        //         width: 16,
        //         height: 16,
        //         channels: 3,
        //         background: {
        //           r: 0,
        //           g: 0,
        //           b: 0,
        //         }
        //       }
        //     })
        //     .jpeg().toBuffer()
        //   newImage = [...newImage];
        // }

        const album = common.album ? common.album : '';
        const artist = common.artist ? common.artist : '';
        const diskNumber = common.disk ? common.disk : '';
        const genre = common.genre ? common.genre : '';
        // format, // to be determined
        const length = format.duration ? format.duration : '';
        const path = p;
        const rating = 0;
        const tags = [];
        // Todo: if title is bad, use path to get title
        const title = common.title ? common.title : '';
        const trackNumber = common.track ? common.track : '';
        const year = common.year ? common.year : '';

        const cover = largeImage ? largeImage : null;
        const thumbnail = {
          format: cover ? cover.format : null,
          data: newImage ? newImage : null
        }

        // Todo: better id generation
        const uid = `${title}${album}${artist}`;

        const song = {
          id: uid,
          album,
          artist,
          diskNumber,
          genre,
          path,
          length,
          rating,
          tags,
          thumbnail,
          title,
          trackNumber,
          year
        };

        // todo: make function // processNewSong(song);
        db.songs.find({
          _id: uid
        }, (err, docs) => {
          if (err) {
            console.warn(err);
          } else if (docs.length > 1) {
            console.error("Entities should have unique id's"); // This should never happen
          } else if (docs.length === 1) {
            const exists = docs[0].songs.some(x => x.path === song.path); // check for existing file path
            if (!exists) {
              // update doc
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
                    // this.existingSongs++;
                    win.webContents.send('ham', `------- ${songsToProcess.length}`);
                    processSongs();
                  }
                }
              );
            } else {
              console.warn('song already in library');
              win.webContents.send('ham', `0000000 ${songsToProcess.length}`);
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
                // this.songsAdded++;
                win.webContents.send('ham', `+++++++ ${songsToProcess.length}`);
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
    processingSongs = false;
  }
}

function runService(workerData) {
  win = mainAppWindow.getInstance();
  return new Promise((resolve, reject) => {
    const worker = new Worker('./src/main/workers/discoveryWorker.js', {
      workerData
    });

    worker.on('message', (data) => {
      // console.log(data);
      // win.webContents.send('ham', data);
      songsToProcess.push(...data.filePaths);
      return resolve('ten tons of ham burgers');
    });
    worker.on('error', (data) => {
      console.log(data);
      win.webContents.send('ham', 'hairy baby');
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

ipcMain.handle('findSongs', async (event, args) => {
  runService(args).then(x => {
    console.log(x);
  }).catch(err => {
    console.log(err)
  });
})

ipcMain.handle('loadAllSongs', async (even, args) => {
  let res = 'poo';
  res = await new Promise((resolve, reject) => {
    db.songs.find({}, (err, docs) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(docs);
      }
    });
  })
  return res;
})
