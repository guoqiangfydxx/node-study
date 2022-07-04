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
  res.render('index')

})

app.delete('/project/:id', (req, res, next) => {
  // res.render('index')

})

app.post('/projects', (req, res, next) => {
  // res.render('index')

})

app.post('/projects/:id/tasks', (req, res, next) => {
  // res.render('index')

})

app.get('/projects/:id/tasks', (req, res, next) => {
  // res.render('index')

})

app.delete('/tasks/:id', (req, res, next) => {
  // res.render('index')

})

app.listen(5454)