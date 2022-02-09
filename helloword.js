const http = require('http');
const hostname = '127.0.0.1';
const port = 4566;
const fs = require('fs')
const server = http.createServer((req, res) => {
  // let data = '';
  // req.on('data', chunk => {
  //   data += chunk;
  // })
  // req.on('end', () => {
  //   console.log('end', data, typeof data)
  //   // console.log('data>>>', JSON.parse(data).todo) // '做点事情'
  // })
  // res.statusCode = 200;
  // res.setHeader('Content-Type', 'text/plain');
  // res.end('Hello World8485838349588\n');
});

// 从命令行接收参数
// const argv = (process.argv.slice(2));
// console.log('name>>>>', argv)

// 和命令行交互
// console.log('我的%s已经%d岁', '猫', 2);
// console.log('%o', Number);
// const x = 1
// const y = 2
// const z = 3
// console.count(
//   'x 的值为 ' + x + ' 且已经检查了几次？'
// )
// console.count(
//   'x 的值为 ' + x + ' 且已经检查了几次？'
// )
// console.count(
//   'y 的值为 ' + y + ' 且已经检查了几次？'
// )

// const oranges = ['橙子', '橙子']
// const apples = ['苹果']
// oranges.forEach(fruit => {
//   console.count(fruit)
// })
// apples.forEach(fruit => {
//   console.count(fruit)
// })

// const function2 = () => console.trace()
// const function1 = () => function2()
// function1()

// const doSomething1 = () => console.log('测试')
// const measureDoingSomething = () => {
//   console.time('doSomething1()')
//   //做点事，并测量所需的时间。
//   doSomething1()
//   console.timeEnd('doSomething1()')
// }
// measureDoingSomething()

// const ProgressBar = require('progress')

// const bar = new ProgressBar(':bar', { total: 10 })
// const timer = setInterval(() => {
//   bar.tick()
//   if (bar.complete) {
//     clearInterval(timer)
//   }
// }, 100)

// 从命令行读取输入内容
// const readline = require('readline').createInterface({
//   input: process.stdin,
//   output: process.stdout
// })

// readline.question(`你叫什么名字?`, name => {
//   console.log(`你好 ${name}!`)
//   readline.close()
// })

// 事件系统
// const EventEmitter = require('events')
// const eventEmitter = new EventEmitter()

// eventEmitter.on('start', (start, end) => {
//   console.log(`从${start}到${end}`)
// })

// eventEmitter.emit('start', 1, 50)

// http请求

// const https = require('https')
// const options = {
//   hostname: 'nodejs.cn',
//   port: 443,
//   path: '/todos',
//   method: 'GET'
// }

// const req = https.request(options, res => {
//   console.log(`状态码: ${res.statusCode}`)

//   res.on('data', d => {
//     // process.stdout.write(d)
//     console.log('data>>', d)
//   })
// })

// req.on('error', error => {
//   console.error(error)
// })

// req.end()

// const axios = require('axios')

// axios
//   .post('http://nodejs.cn/todos', {
//     todo: '做点事情'
//   })
//   .then(res => {
//     console.log(`状态码: ${res.statusCode}`)
//     // console.log(res)
//   })
//   .catch(error => {
//     console.error(error)
//   })




server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

/* =============文件描述符 ================ */


fs.open('yarn.lock', 'r', (err, fd) => {
  //fd 是文件描述符。
  if (!err) {
    console.log('fd', fd)
  }
  console.log('err', err)
})

fs.stat('text.txt', (err, stat) => {
  if (!err) {
    // console.log('stat>>>>',stat)
    // console.log(stat.isFile())
    // console.log(stat.isDirectory())
    // console.log(stat.size)
    // console.log(stat.isSymbolicLink())
  }
})

/** ====================文件路径=========== */

const path = require('path');
// console.log(path.dirname('/text.txt'))
// console.log(path.basename('text.txt'))
// console.log(path.extname('text.txt'));

const notes = 'text.txt'

path.dirname(notes) // /users/joe
path.basename(notes) // notes.txt
path.extname(notes) // .txt

// fs.readFile('text.txt', 'utf8', (err, data) => {
//   if (!err) {
//     console.log('data>>', data)
//   }
// })


// const content = '7日将迎来春节后的首个交易日。节前，受美联储加息预期升温、东欧局势紧张等因素影响，A股市场整体情绪较弱，开年之后，将演绎着一场怎样的行情'
// fs.writeFile('text.txt', content, (err) => {
//   if (err) {
//     console.log(err)
//     return;
//   }
// })

// fs.appendFile('text.txt', ', 一些内容', err => {
//   if (err) {
//     console.log(err)
//     return;
//   }
// })

/**================文件夹==================== */
fs.access('node_modules',fs.constants.F_OK, err => {
  if (!err) {
    console.log('可以读取')
  }
})

// 创建新的文件夹
// const folderName = 'test'
// try {
//   if (!fs.existsSync(folderName)) {
//     fs.mkdirSync(folderName)
//   }
// } catch (err) {
//   console.error(err)
// }

// const te = fs.readdirSync('node_modules')
// console.log('te>>>', te)

// const folderPath = 'node_modules'
// const isFile = fileName => {
//   return fs.lstatSync(fileName).isFile()
// }

// const ss = fs.readdirSync(folderPath).map(fileName => {
//   return path.join(folderPath, fileName)
// })
// .filter(isFile)
// console.log('ss>>>>', ss)

// fs.rename('test', 'tests', err => {
//   if (!err) {
//     console.log('重命名文件夹')
//   }
// })

// fs.rmdir('tests',{ recursive: true }, err => {
//   if (!err) {
//     console.log('删除文件夹')
//   }
// });

// console.log('parse>>>>', path.parse('text.txt'))

/** ===============操作系统================= */
// const os = require('os')
// console.log('rch>>>>', os.arch())
// console.log('cpu', os.cpus())
// console.log('freemem', os.freemem())
// console.log('homedir>', os.homedir())
// console.log('hostname', os.hostname())
// console.log('network', os.networkInterfaces())
// console.log('platform', os.platform())
// console.log('type>>', os.type())
// console.log('userInfo', os.userInfo())


const Stream = require('stream')

const readableStream = new Stream.Readable({
  read() {}
})
const writableStream = new Stream.Writable()

writableStream._write = (chunk, encoding, next) => {
  console.log('chunk', chunk.toString())
  next()
}

readableStream.on('readable', () => {
  console.log('read', readableStream.read())
})

// writableStream.write('hey!\n')


readableStream.pipe(writableStream)

readableStream.push('hi!')
readableStream.push('ho!')
// writableStream.end()