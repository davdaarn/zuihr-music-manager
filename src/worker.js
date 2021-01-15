// const {
//   workerData,
//   parentPort
// } = require('worker_threads');


// console.log(chalk.green(workerData));

// const paths = [];

// const walk = dirPath => {
//   let subFiles = fs.readdirSync(dirPath);
//   subFiles.forEach(f => {
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

// workerData.forEach(file => {
//   let root = file.replace('\\', '/');
//   if (fs.lstatSync(root).isDirectory()) {
//     walk(root);
//   } else if (
//     fs.lstatSync(root).isFile() &&
//     RegExp('[.]mp3$').test(root)
//   ) {
//     paths.push(root);
//   }
// });

// console.log(chalk.yellow(paths.length));

// parentPort.postMessage({
//   fileName: workerData,
//   status: 'Done'
// });

export default function () {
  console.log('hello')
}
