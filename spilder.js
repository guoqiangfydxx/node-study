const http = require('https')
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path')
const request = require('request')
const dir = path.join(__dirname + '/images')
http.get('https://www.qunar.com/', (res) => {
  const { statusCode } = res;
  const contentType = res.headers['content-type'];

  let error;
  // 任何 2xx 状态码都表示成功响应，但这里只检查 200。
  if (statusCode !== 200) {
    error = new Error('Request Failed.\n' +
                      `Status Code: ${statusCode}`);
  } else if (!/^text\/html/.test(contentType)) {
    error = new Error('Invalid content-type.\n' +
                      `Expected text/html but received ${contentType}`);
  }
  if (error) {
    console.error(error.message);
    // 消费响应数据以释放内存
    res.resume();
    return;
  }

  res.setEncoding('utf8');
  let rawData = '';
  res.on('data', (chunk) => { rawData += chunk; });
  res.on('end', () => {
    try {
      // const parsedData = JSON.parse(rawData);
      // console.log(parsedData);
      const $1 = cheerio.load(rawData);
      $1('img').each((index, element) => {
        console.log($1(element).attr('src'))
        const src = $1(element).attr('src').startsWith('http') ? $1(element).attr('src') : `https:${$1(element).attr('src')}`
        const arr = src.split('/')
        const name = arr[arr.length - 1]
        request.get(src).pipe(fs.createWriteStream(`${dir}/${name}`))
        // http.get($(element).attr('src').startsWith('http') ? $(element).attr('src') : `https:${$(element).attr('src')}`, (err, data) => {
        //   console.log('data', data, err)
        // })
      })
      // console.log('rowData', rawData)
    } catch (e) {
      console.error(e.message);
    }
  });
}).on('error', (e) => {
  console.error(`Got error: ${e.message}`);
});