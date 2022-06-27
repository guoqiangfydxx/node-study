const http = require('http')
http.request({
  host: '127.0.0.1',
  port: 4344,
  url: '/',
  method: 'get',
}, res => {
  let body = ''
  res.setEncoding('utf8');
  res.on('data', chunk => {
    body += chunk
  })
  res.on('end', () => {
    console.log('body', body)
  })
}).end()