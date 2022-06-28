const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'jade')

const connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : '951753852',
  database : 'EXAMPLE'
});

connection.connect();

app.get('/', (req, res, next) => {
  connection.query('SELECT * FROM item', (err, result) => {
    if (err) {
      throw err;
    }
    console.log('ff', result)
    res.render('index', { items: result })
  })

})

app.get('/item/:id', (req, res) => {
  const querySql = 'SELECT * FROM item WHERE id = ? LIMIT 1'
  const querySqlParams = [req.params.id]
  connection.query(querySql, querySqlParams, (err, result) => {
    if (err) {
      throw err;
    }
    connection.query('SELECT * FROM review WHERE item_id = ?', result[0].id, (err1, result1) => {
      if (err1) {
        throw err1
      }
      res.render('item', { reviews: result1, item: result[0]})
    })
  })
})

app.post('/create', (req, res, next) => {
  const addSql = 'INSERT INTO item(title, description) VALUES(?,?)';
  const addSqlParams = [req.body.title, req.body.description]
  connection.query(addSql, addSqlParams, (err, result) => {
    if (err) {
      throw err;
    }
    console.log('insert', result)
    res.redirect('/')
  })
})


app.post('/item/:id/review', (req, res, next) => {
  const addSql = 'INSERT INTO review(item_id, stars, text) VALUES(?,?,?)';
  const addSqlParams = [req.params.id, req.body.stars, req.body.text]
  connection.query(addSql, addSqlParams, (err, result) => {
    if (err) {
      throw err;
    }
    console.log('insert', result)
    res.redirect('/item/' + req.params.id)
  })
})

app.listen(5454)