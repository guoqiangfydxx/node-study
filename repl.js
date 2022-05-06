// const repl = require('repl');
// const msg = 'message';

// repl.start('> ').context.m = msg;

// const net = require('net');
// const repl = require('repl');
// let connections = 0;

// repl.start({
//   prompt: 'Node.js via stdin> ',
//   input: process.stdin,
//   output: process.stdout
// });

// net.createServer((socket) => {
//   connections += 1;
//   repl.start({
//     prompt: 'Node.js via Unix socket> ',
//     input: socket,
//     output: socket
//   }).on('exit', () => {
//     socket.end();
//   });
// }).listen('5002');

// net.createServer((socket) => {
//   connections += 1;
//   repl.start({
//     prompt: 'Node.js via TCP socket> ',
//     input: socket,
//     output: socket
//   }).on('exit', () => {
//     socket.end();
//   });
// }).listen(5001);


const repl = require('repl');

const replServer = repl.start({ prompt: '> ' });
replServer.defineCommand('sayhello', {
  help: 'Say hello',
  action(name) {
    this.clearBufferedCommand();
    console.log(`Hello, ${name}!`);
    this.displayPrompt();
  }
});
replServer.defineCommand('saybye', function saybye() {
  console.log('Goodbye!');
  this.close();
});