const process = require('process');


// process.on('beforeExit', (code) => {
//   console.log('Process beforeExit event with code: ', code);
// });

// process.on('exit', (code) => {
//   console.log('Process exit event with code: ', code);
// });

// console.log('This message is displayed first.');

// process.on('uncaughtException', (err, origin) => {
//  console.log('err', err, origin)
// });

// setTimeout(() => {
//   console.log('This will still run.');
// }, 500);

// // 故意引发异常，但不捕获。
// nonexistentFunc();
// console.log('This will not run.');

// console.log('arch', process.arch)

// process.argv.forEach((val, index) => {
//   console.log(`${val}, ${index}`)
// })

// console.log('config', process.config)

console.log('versions', process.versions)