const express = require('express')
const serverStatic = require('serve-static')
const path = require('path')
module.exports = dir => {
  dir = dir || '.'
  const app = express()
  const router = express.Router()
  app.use('/assets', serverStatic(path.resolve(dir, 'assets'), { index: false}))
  app.use(router);
   router.get('/posts/*', (req, res, next) => {
    res.end(req.params[0])
  })
  router.get('/', (req, res, next) => {
    res.type('text/plain')
    res.end('文字列表', 'utf8')
  })
  app.listen(3000)
}