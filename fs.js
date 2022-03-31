const { unlink, access, writeFile } = require('fs/promises');
const { constants } = require('fs');
const fsPromise = require('fs/promises');
const Buffer = require('buffer');

// (async function(path) {
//   try {
//     await unlink(path);
//     console.log(`successfully deleted ${path}`);
//   } catch (error) {
//     console.error('there was an error:', error.message);
//   }
// })('./temp.txt');

// (async () => {
//   try {
//   await access('./temp.txt', constants.R_OK | constants.W_OK);
//   console.log('can access');
// } catch {
//   console.error('cannot access');
// }
// })();

// fsPromise.appendFile('./temp.txt', 'Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。Node.js 使用了一个事件驱动、非阻塞式 I/O 的模型,使其轻量又高效。Node.js 的包管理器 npm,是全球最大的开源库生态系统。', 'utf8');

// fsPromise.copyFile('./temp.txt', 'temp2.txt')

// fsPromise.mkdir('./dist')

// fsPromise.rm('./temp2.txt')

// fsPromise.truncate('./temp.txt', 10)
