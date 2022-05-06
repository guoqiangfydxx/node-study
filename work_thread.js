// const {
//   Worker, isMainThread, parentPort, workerData
// } = require('worker_threads');

// if (isMainThread) {
//   module.exports = function parseJSAsync(script) {
//     return new Promise((resolve, reject) => {
//       const worker = new Worker(__filename, {
//         workerData: script
//       });
//       worker.on('message', resolve);
//       worker.on('error', reject);
//       worker.on('exit', (code) => {
//         if (code !== 0)
//           reject(new Error(`Worker stopped with exit code ${code}`));
//       });
//     });
//   };
// } else {
//   const { parse } = require('some-js-parsing-library');
//   const script = workerData;
//   parentPort.postMessage(parse(script));
// }

'use strict';

const {
  isMainThread,
  BroadcastChannel,
  Worker,
  MessageChannel
} = require('worker_threads');

// const bc = new BroadcastChannel('hello');

// if (isMainThread) {
//   let c = 0;
//   bc.onmessage = (event) => {
//     console.log(event.data);
//     if (++c === 10) bc.close();
//   };
//   for (let n = 0; n < 10; n++)
//     new Worker(__filename);
// } else {
//   bc.postMessage('hello from every worker');
//   bc.close();
// }

const { port1, port2 } = new MessageChannel();
port1.on('message', (message) => console.log('received', message));
port2.postMessage({ foo: 'bar' });