const { connection } = require('./database');
const redis = require('redis')
const redisClient = redis.createClient({
  host: '127.0.0.1',
  port: 6379
});
redisClient.connect()
redisClient.on('error', (err) => {
  console.log('redis error>>>', err);
});
const { redirectUriNotMatchError, invalidParameterError, missingParameterError, extendMaxRequestNum } = require('./utils');
function extendAPIOutput(req, res, next) {
  res.apiSuccess = data => {
    res.json({
      status: 'ok',
      result: data
    })
  }

  res.apiError = err => {
    res.json({
      status: 'error',
      error_code: err.error_code || 'UNKNOWN',
      error_message: err.error_message || err.toString()
    })
  }

  next()
}

function apiErrorHandle(err, req, res, next) {
  if (typeof res.apiError === 'function') {
    return res.apiError(err)
  }
  next()
}

function ensureLogin(req, res,next) {
  req.loginUserId = '49899',
  next()
}

function checkAuthorizeParams(req, res, next) {
  const { client_id, redirect_url } = req.query
  console.log('fhfsjssfsf', req.query)
  connection.query('SELECT * FROM appinfo where client_id = ?', [client_id], (err, result) => {
    if (err) {
      return next(err)
    }
    req.appInfo = result[0]
    console.log('rre', result)
    console.log('redirect_url', redirect_url)
    if (!result) {
      return next(invalidParameterError('client_id'))
    }
    if (result[0].redirect_url !== redirect_url) {
      return next(redirectUriNotMatchError('redirect_url'))
    }
    next()
  })
}


function verifyAccessToken(req, res, next) {
  const accesstoken = req.cookies.accesstoken
  const clientId = req.body.client_id
  if (!accesstoken) {
    return next(missingParameterError('accesstoken'))
  }
  if (!clientId) {
    return next(missingParameterError('client_id'))
  }
  connection.query('SELECT * FROM appinfo WHERE client_id = ?', [clientId], (err, result) => {
    if (err) {
      return next(err)
    }
    if (result[0].accesstoken !== accesstoken) {
      return invalidParameterError('client_id')
    }
    next()
  })
}

async function rateLimiter(req, res, next) {
  const count = await redisClient.get('count')
  console.log('count',  count)
  if (!count) {
    await redisClient.set('count', 1)
    next()
  } else if (count > 5) {
    return next(extendMaxRequestNum())
  } else {
    await redisClient.set('count', count + 1)
    next()
  }
}

module.exports = {
  extendAPIOutput,
  apiErrorHandle,
  ensureLogin,
  checkAuthorizeParams,
  verifyAccessToken,
  rateLimiter
}