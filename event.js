const {EventEmitter} = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new EventEmitter({ captureRejections: true });
myEmitter.on('event', () => {
  console.log('an event occurred!');
});

myEmitter.on('error', msg => {
  console.error(msg)
})

// myEmitter.emit('error', new Error('whoops!'));

myEmitter.emit('event', async value => {
  throw new Error('rrr')
})


myEmitter[Symbol.for('nodejs.rejection')] = console.log;
