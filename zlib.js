const { createGzip,deflate, unzip } = require('zlib');
// const { pipeline } = require('stream');
// const {
//   createReadStream,
//   createWriteStream
// } = require('fs');

// const gzip = createGzip();
// const source = createReadStream('input.txt');
// const destination = createWriteStream('input.txt.gz');

// pipeline(source, gzip, destination, (err) => {
//   if (err) {
//     console.error('An error occurred:', err);
//     process.exitCode = 1;
//   }
// });


const input = '.................................';
deflate(input, (err, buffer) => {
  if (err) {
    console.error('An error occurred:', err);
    process.exitCode = 1;
  }
  console.log(buffer.toString('base64'));
});

const buffer = Buffer.from('eJzT0yMAAGTvBe8=', 'base64');
unzip(buffer, (err, buffer) => {
  if (err) {
    console.error('An error occurred:', err);
    process.exitCode = 1;
  }
  console.log(buffer.toString());
});