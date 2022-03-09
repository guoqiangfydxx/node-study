const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const { Buffer } = require('buffer')

server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});

server.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.on('close', msg => {
  console.log('close', msg)
})

server.bind(41234);

const message = Buffer.from('Some bytes');
server.send('fsfsfsddsfdfdsfdfdsfdsfs', 41234, 'localhost', err => {
  // server.close()
  console.error(err)
})
// server.connect(8080)
