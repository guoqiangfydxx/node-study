// const stream = require('stream');
// const fs = require('fs');
// const file = fs.createWriteStream('example.txt');
// file.write('hello, ');
// file.end('world!');
// file.write('jfdflk')

const fs = require('fs');
const rr = fs.createReadStream('foo.txt');
rr.on('readable', () => {
  let chunk;
  console.log('Stream is readable (new data received in buffer)');
  // 使用循环来确保读取所有当前可用的数据
  while (null !== (chunk = rr.read())) {
    console.log(`Read ${chunk.length} bytes of data...`);
  }
});
rr.on('end', () => {
  console.log('end');
});
// rr.resume()，