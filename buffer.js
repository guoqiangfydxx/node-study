const { Buffer, Blob } = require('buffer');

// const buf = Buffer.from('hello world', 'utf8');

// console.log(buf.toString('hex'))
// console.log(buf.toString('base64'))

// console.log(Buffer.from('fhqwhgads', 'utf8'));

// console.log(buf.toString())

// const buf1 = Buffer.from([1,2,3,4])
// const unitArray = new Uint32Array(buf1)
// console.log(unitArray)
// const unitArray2 = new Uint32Array(buf)
// console.log(unitArray2)

// const arr = new Uint16Array(20);
// const buf3 = Buffer.from(arr.buffer, 0, 16);

// console.log(buf3.length);

// for (const b of buf) {
//   console.log(b)
// }

// for (const b1 of buf1) {
//   console.log(b1)
// }

const { setTimeout: delay } = require('timers/promises');

const blob = new Blob(['hello there']);

const mc1 = new MessageChannel();
const mc2 = new MessageChannel();

mc1.port1.onmessage = async ({ data }) => {
  console.log(await data.arrayBuffer());
  mc1.port1.close();
};

mc2.port1.onmessage = async ({ data }) => {
  await delay(1000);
  console.log(await data.arrayBuffer());
  mc2.port1.close();
};

mc1.port2.postMessage(blob);
mc2.port2.postMessage(blob);

// 发布后 Blob 仍然可用。
blob.text().then(console.log);