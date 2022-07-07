const mysql = require('mysql');
const { randomString } = require('./utils');
const connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : '951753852',
  database : 'oauth'
});

connection.connect();

function generateAuthorizationCode(loginUserId, client_id, redirect_url, callback) {
  const code = randomString(20)
  connection.query('update appinfo set userId = ? where client_id = ?', [loginUserId, client_id], (err, result) => {
    callback(err, code)
  })
}

module.exports = {
  generateAuthorizationCode,
  connection
};