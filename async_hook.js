const { createHook,triggerAsyncId,  executionAsyncId } = require('async_hooks');
const { stdout } = require('process');
const net = require('net');
const fs = require('fs')

const async_hooks = require('async_hooks');
// createHook({
//   init(asyncId, type, triggerAsyncId) {
//     const eid = executionAsyncId();
//     fs.writeSync(
//       stdout.fd,
//       `${type}(${asyncId}): trigger: ${triggerAsyncId} execution: ${eid}\n`);
//   }
// }).enable();

// net.createServer((conn) => {}).listen(8080);

const { fd } = process.stdout;

let indent = 0;
async_hooks.createHook({
  init(asyncId, type, triggerAsyncId) {
    const eid = async_hooks.executionAsyncId();
    const indentStr = ' '.repeat(indent);
    fs.writeSync(
      fd,
      `${indentStr}${type}(${asyncId}):` +
      ` trigger: ${triggerAsyncId} execution: ${eid}\n`);
  },
  before(asyncId) {
    const indentStr = ' '.repeat(indent);
    fs.writeSync(fd, `${indentStr}before:  ${asyncId}\n`);
    indent += 2;
  },
  after(asyncId) {
    indent -= 2;
    const indentStr = ' '.repeat(indent);
    fs.writeSync(fd, `${indentStr}after:  ${asyncId}\n`);
  },
  destroy(asyncId) {
    const indentStr = ' '.repeat(indent);
    fs.writeSync(fd, `${indentStr}destroy:  ${asyncId}\n`);
  },
}).enable();

net.createServer(() => {}).listen(8080, () => {
  // 让我们在记录服务器启动之前等待 10 毫秒。
  setTimeout(() => {
    console.log('>>>', async_hooks.executionAsyncId());
  }, 10);
});


Promise.resolve(1729).then(() => {
  console.log(`eid ${executionAsyncId()} tid ${triggerAsyncId()}`);
});