const express = require('express')
const bodyParser = require('body-parser')
const { extendAPIOutput, ensureLogin, checkAuthorizeParams, apiErrorHandle, verifyAccessToken, rateLimiter } = require('./middleware')
const cookieParser = require("cookie-parser")
const { addQueryParamsToUrl, randomString } = require('./utils')
const { generateAuthorizationCode, connection } = require('./database')
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())
app.set('view engine', 'ejs')
app.use(extendAPIOutput)
app.use(apiErrorHandle)
app.use('/example', verifyAccessToken, rateLimiter)

app.get('/index', (req, res) => {
  res.render('index')
})

app.get('/test', (req, res) => {
  console.log('jfjfj')
  res.render('test')
})

app.get('/oauth2/authorize', ensureLogin, checkAuthorizeParams, (req, res, next) => {
  res.locals.loginUserId = req.loginUserId
  res.locals.appInfo = req.appInfo;
  res.render('authorize')
})

app.post('/oauth2/authorize', ensureLogin, checkAuthorizeParams, (req, res, next) => {
  generateAuthorizationCode(req.loginUserId, req.query.client_id, req.query.redirect_url, (err, result) => {
    if (err) {
      return next(err)
    }
    const code = randomString(20)
    connection.query('UPDATE appinfo SET accesstoken = ? WHERE client_id = ?', [code, req.query.client_id], (e) => {
      if (e) {
        return next(err)
      }
      res.cookie('accesstoken', code, {
        maxAge: 1000 * 60 * 60,
      })
      res.redirect(addQueryParamsToUrl(req.query.redirect_url, {
        code: result,
        client_id: req.query.client_id,
        redirect_url: req.query.redirect_url
      }))
    })
  })
})

app.post('/example/auth', (req, res) => {
  res.send({
    status: 'ok'
  })
})

app.listen(5353)