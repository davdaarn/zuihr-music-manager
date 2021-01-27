# playlister

An app for managing your music library

## Installation

```
npm i
```

```
npm run electron:rebuild
```

```
npm run electron:serve
```

If on windows and `electron:rebuild` causes issues try:
```
npm run electron:rebuild:win
```

### Feature progress overview in no particular order

- [x] Windows file system support
- [ ] macOs file system support
- [x] Import songs from OS file / folder with drag and drop
- [ ] Import songs from App file browser
- [ ] In app OS directory browser
  - [x] Backend
  - [ ] UI (partly implemented)
- [x] Worker threads for non-blocking disk operations
- [ ] Export playlists for mobile via sd card
- [ ] Export playlists to One Drive for mobile sync
- [ ] Companion mobile app ( Flutter, prof of concept working )
- [ ] Duplicate song management
  - [x] Backend
  - [ ] UI
- [ ] Virtual / infinite scrolling
- [x] Use file metadata to build a song object
- [x] Resize album art to 64x64 and 256x256
- [x] Convert and store album art to base64 for faster processing on frontend
- [ ] Support for multiple song formats
  - [x] mp3
- [ ] Smooth launch experience
- [ ] Non-blocking UI experience for all tasks
- [ ] Setup github build tasks
- [ ] Website to download builds
- [ ] Experimental / Research
  - [ ] Strip / replace all metadata for cloud saved songs...
  - [ ] Auto update
  

### Possible features for a paid subscription 

These features could require hosting costs, legal advisement, etc...

- [ ] User registration
- [ ] Companion web app ( maybe... )
- [ ] Syncing between devices
- [ ] Songs and playlists saved to the cloud
- [ ] Streaming
- [ ] One day create a better spotify 😏