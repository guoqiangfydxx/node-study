const express = require('express')
const serverStatic = require('serve-static')
const path = require('path')
const MarkdownIt = require('markdown-it')
const fs = require('fs')
const swig = require('swig')
const rd= require('rd')
const utils = require('./util')
const md = new MarkdownIt({
  html: true,
  langPrefix: 'code-'
})
module.exports = dir => {
  dir = dir || '.'
  const app = express()
  const router = express.Router()
  app.use('/assets', serverStatic(path.resolve(dir, 'assets'), { index: false}))
  app.use(router);
  router.get('/posts/*', (req, res, next) => {
    console.log('req', req.params)
    // res.end(req.params[0])
    const fileName = utils.stripExtname(req.params[0])
    const file = path.resolve(dir, '_posts', fileName + '.md')
    const html = utils.renderPost(dir, file)
     // 这里type和encoding缺一不可，否则的话浏览器不知道该怎么解析返回的内容
    res.type('.html')
    res.end(html, 'utf8')
  })
  router.get('/', (req, res, next) => {
    const html = utils.renderIndex(dir)
    res.type('.html')
    res.end(html, 'utf8')
  })
  app.listen(3000)
}