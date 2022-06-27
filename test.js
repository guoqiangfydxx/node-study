// function c() {
//   b()
// }
// function b() {
//   a()
// }
// function a() {
//   setTimeout(() => {
//     throw new Error('here')
//   }, 10)
// }
// c();
// console.log('global', globalThis)
// console.log(1)
// process.nextTick(() => {
//   console.log(3)
// })
// console.log(2)
// const fs = require('fs')
// fs.readFile('./save.txt', (err, content) => {
//   if (!err) {
//     console.log(content.toString())
//   }
// })
// const { Buffer } = require('buffer'); 
// const myBuffer = Buffer.from('==ii1j2i3h1i23h', 'base64')
// const fs = require('fs')
// fs.writeFile('logo.png', myBuffer, (err, a) => {
//   if (!err) {
//     console.log(a)
//   } else {
//     console.log(err)
//   }
// });
// console.log('hello world')
// console.log(process.stdout.write('hello world'))
// 一个简单的CLI
// const fs = require('fs');
// const stdout = process.stdout;
// const stdin = process.stdin;
// console.log('Select which file or directory you want to see');
// fs.readdir(__dirname, (err, files) => {
//   if (!err) {
//     const len = files.length;
//     for (let i = 0; i < len; i++) {
//       console.log(`${i}    ${files[i]}`)
//     }

//     stdin.setEncoding('utf8');
//     stdin.on('data', data => {
//       if (Number(data) >= 0) {
//         console.log('in')
//         const fileName = files[Number(data)]
//         fs.stat(`${__dirname}/${fileName}`, (err, stats) => {
//           if (!err) {
//             if (stats.isDirectory()) {
//               fs.readdir(`${__dirname}/${fileName}`, (err, files) => {
//                 if (!err) {
//                   files.forEach((name, index) => {
//                     console.log(`${index}    ${name}`)
//                   })
//                 }
//               })
//             } else {
//               fs.readFile(`${__dirname}/${fileName}`, { encoding: 'utf8' }, (err, data) => {
//                 console.log('file', data)
//               })
//             }
//           } else {
//             console.log('文件不存在')
//           }
//         })
//       }
//     })
//   }
// })


// console.log('process', process.argv)
// console.log('cwd', process.cwd())

// console.log('env', process.env.NODE_ENV)

// console.log('exit')
// process.exit();


// 使用stream可以分块读取文件，而这一方法比readFile要更加强大
// const fs = require('fs')
// const stream = fs.createReadStream('喜马拉雅-小说内容(1).txt')
// stream.on('data', chunk => {
//   console.log('chunk', chunk)
// })
// stream.on('end', chunk => {
//   console.log('end', chunk)
// })
// fs.readFile('喜马拉雅-小说内容(1).txt', (err, data) => {
//   console.log('data', data)
// })

// // 监听文件
// const fs = require('fs')
// fs.watch(__dirname, (eventType, filenmae) => {
//   console.log('eventType', eventType, filenmae)
// })



const http = require('http')
const fs = require('fs')
// http.createServer((req, res) => {
//   res.setHeader('Content-Type', 'text/plain;;charset=utf-8');
//   const stream = fs.createReadStream('喜马拉雅-小说内容(1).txt', { encoding: 'utf8'})
//   stream.on('data', chunk => {
//     // console.log(chunk)
//     res.write(chunk)
//   })
//   stream.on('end', chunk => {
//     res.end()
//   })
// }).listen(8888)

// http.createServer((req, res) => {
//   if (req.url === '/') {
//  res.setHeader('Content-Type', 'text/html;charset=utf-8')
//   res.end(`<form action='/url' method='post'>
//     <h1>my form</h1>
//     <label>name</label>
//     <input type='text' name='name' />
//     <p>
//       <button>submit</button>
//     </p>
//   </form>`)
//   } else if (req.url === '/url') {
//     let body = ''
//     req.on('data', chunk => {
//       body += chunk;
//     })

//     req.on('end', () => {
//       console.log('body', body)
//       const params = new URLSearchParams(body)
//       res.setHeader('Content-Type', 'text/html;charset=utf-8')
//       res.end(`you sent a ${req.method} request, your name is: ${params.get('name')}`)
//     })
//   } else {
//     res.statusCode = 404;
//     res.end('not found')
//   }
 
// }).listen('7494')


// http.createServer((req, res) => {
//   res.end('hello world')
// }).listen(4344)
function server(path, type, res) {
  res.setHeader('Content-Type', type)
  fs.createReadStream(path).pipe(res)
}
http.createServer((req, res) => {
  // console.log('rqs', req)
  console.log('url', req.url)
  if (req.method === 'GET'  && '.jpg' === req.url.substr(-4) && '/images' === req.url.substring(0, 7)) {
    fs.readFile(`${__dirname}${req.url}`, (err, data) => {
      console.log('err', err)
      if (err) {
        res.statusCode = 404;
        res.end('not found')
      } else {
        server(`${__dirname}${req.url}`, 'image/jpg', res)
      }
    })
  } else if (req.method === 'GET' && req.url === '/') {
    server(__dirname + '/temp.txt', 'text/plain;charset=utf-8', res)
  } else {
    res.statusCode = 404;
    res.end('not found')
  }
}).listen(8884)