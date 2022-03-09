// const name1 = 'Will Robinson';
// console.warn(`Danger ${name1}! Danger!`);
// console.log('hello world');
// // 打印: hello world 到标准输出
// console.log('hello %s', 'world');
// // 打印: hello world 到标准输出
// console.error(new Error('Whoops, something bad happened'));
const fs = require('fs')
const { Console } = require('console');
const output = fs.createWriteStream('./stdout.log');
const errorOutput = fs.createWriteStream('./stderr.log');
// 自定义的简单记录器
const logger = new Console({ stdout: output, stderr: errorOutput });
// 像控制台一样使用它
const count = 5;
logger.log('count: %d', count);

logger.error(new Error('dd'))


console.count()

console.count('default')

console.count('abc')

console.count('xyz')

console.count('abc')

console.count()

console.countReset();

console.count()

console.table([{ a: 1, b: 'Y' }, { a: 'Z', b: 2 }]);

console.time('100-elements');
for (let i = 0; i < 100; i++) {}
console.timeEnd('100-elements');

console.trace('show me')