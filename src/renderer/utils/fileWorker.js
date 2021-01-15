// const walk = dirPath => {
//   // console.log(dirPath);
//   let subFiles = fs.readdirSync(dirPath);
//   // console.log(subFiles);
//   subFiles.forEach(f => {
//     // console.log(f);
//     let nextPath = `${dirPath}/${f}`;
//     if (fs.lstatSync(nextPath).isDirectory()) {
//       // Todo: do some basic filtering as to not look in node_modules, .files, etc.
//       walk(nextPath);
//     } else if (
//       fs.lstatSync(nextPath).isFile() &&
//       RegExp('[.]mp3$').test(nextPath)
//     ) {
//       paths.push(nextPath);
//     }
//   });
// };

// const search = basePaths => {
//   const songPaths = [];

//   e.dataTransfer.files.forEach(file => {
//     let root = file.path.replace('\\', '/');
//     if (fs.lstatSync(root).isDirectory()) {
//       walk(root);
//     } else if (
//       fs.lstatSync(root).isFile() &&
//       RegExp('[.]mp3$').test(root)
//     ) {
//       paths.push(root);
//     }
//   });
// }

onmessage = e => {
  switch (e.data) {
    default:
      break;
    case 'findSongs':
      self.postMessage({
        type: 'SET_SEARCHING',
        payload: true
      });
      // search(e.data...);
      setTimeout(() => {
        self.postMessage({
          type: 'SET_SEARCHING',
          payload: false
        });
      }, 3000);
      break;
  }
}
