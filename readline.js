// const readline = require('readline');
const { stdin: input, stdout: output } = require('process');

// const rl = readline.createInterface({ input, output });

// rl.on('line', (input) => {
//   console.log(`Recaived: ${input}`)
// })

// rl.on('pause', () => {
//   console.log('Readline paused.');
// });

// rl.on('SIGINT', () => {
//   rl.question('Are you sure you want to exit? ', (answer) => {
//     if (answer.match(/^y(es)?$/i)) rl.pause();
//   });
// });

// rl.prompt()

// rl.question('What do you think of Node.js? ', (answer) => {
//   // TODO：记录答案到数据库中
//   console.log(`Thank you for your valuable feedback: ${answer}`);


//   // rl.close();
// });

// rl.write('Delete this!');

// rl.write(null, { ctrl: true, name: 'u' });
// (async () => {
//   const answer = await rl.question('What is your favorite food? ');
//   console.log(`Oh, so your favorite food is ${answer}`);
// })()


// const ac = new AbortController();
// const signal = ac.signal;

// rl.question('What is your favorite food? ', { signal }, (answer) => {
//   console.log(`Oh, so your favorite food is ${answer}`);
// });

// signal.addEventListener('abort', () => {
//   console.log('The food question timed out');
// }, { once: true });

// setTimeout(() => ac.abort(), 10000);


// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
//   prompt: 'OHAI> '
// });

// rl.prompt();

// rl.on('line', (line) => {
//   switch (line.trim()) {
//     case 'hello':
//       console.log('world!');
//       break;
//     default:
//       console.log(`Say what? I might have heard '${line.trim()}'`);
//       break;
//   }
//   rl.prompt();
// }).on('close', () => {
//   console.log('Have a great day!');
//   process.exit(0);
// });


const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('input.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // 注意：使用 crlfDelay 选项
  // 将 input.txt 中的所有 CR LF ('\r\n') 实例识别为单个换行符。

  for await (const line of rl) {
    // input.txt 中的每一行都将在此处作为 `line` 连续可用。
    console.log(`Line from file: ${line}`);
  }
}

processLineByLine();