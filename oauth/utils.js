function createApiError(code, msg) {
  const err = new Error(msg)
  err.error_code = code;
  err.error_message = msg;
  return err;
}
function missingParameterError(name) {
  return createApiError('MISSING_PARAMETER', `缺少参数：${name}`)
}

function redirectUriNotMatchError(url) {
  return createApiError('回调地址不正确', `回调地址不正确：${url}`)
}

function invalidParameterError(name) {
  return createApiError('INVALID_PARAMETER', `参数${name}不正确`)
}

function extendMaxRequestNum() {
  return createApiError('MAX_NUM', `调用次数超出限制`)
}


function addQueryParamsToUrl(link, params) {
  const url = new URL(link)
  for(const key in params) {
    url.searchParams.append(key, params[key])
  }
  return url.href;
}

function randomString(size, chars) {
  let len = size || 6
  let codeString = chars || 'ABCDEFGHIGKLMNOPQRSTUVWSYZabcdefghijklmnopqrstuvwxyz0123456789'
  const maxNum = codeString.length + 1
  let newPass = ''
  while(len > 0) {
    newPass += codeString.charAt(Math.floor(Math.random() * maxNum))
    len--
  }
  return newPass;
}

module.exports = {
  missingParameterError,
  redirectUriNotMatchError,
  invalidParameterError,
  addQueryParamsToUrl,
  randomString,
  extendMaxRequestNum
}