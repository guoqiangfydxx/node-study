const express = require('express')
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient;
const bodyParser = require('body-parser')
const app = express()
const ObjectId = mongodb.ObjectId;
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.set('views', process.cwd() + '/views')
app.set('view engine', 'jade')
console.log('cwd', process.cwd() + '/views')

app.use((req, res, next) => {
  console.log('loggedIn', app.get('id'))
  if (app.get('id')) {
    app.allUsers.find({ _id: new ObjectId(app.get('id')) }).toArray((err, doc) => {
      if(err) return next(err);
      console.log('dovccc', doc)
      app.set('me', doc[0])
      next()
    })
  } else {
    next();
  }
})

app.get('/', (req,res) => {
  res.render('index', { authenticated: app.get('id'), my: app.get('me') || {} },(err, html) => {
    if (!err) {
      res.send(html)
    } else {
      console.log('err', err)
    }
  })
})

app.get('/login', (req, res) => {
  res.render('login', (err, html) => {
    if (!err) {
      res.send(html)
    } else {
      console.log('err', err)
    }
  })
})

app.get('/signup', (req, res) => {
  res.render('signup')
})

app.get('/logout', (req, res) => {
  app.set('id', null)
  res.redirect('/')
})

app.post('/login', (req, res) => {
  console.log('user', req.body)

  app.allUsers.find({ email: req.body.email, password: req.body.password }).toArray((err, doc) => {
    if (err) throw err;
    console.log('doc', doc)
    if (doc.length > 0) {
      app.set('id', doc[0]._id)
      res.redirect('/')
    } else {
      res.send('用户名或者密码错误，请重新输入')
    }
  })
})

app.post('/signup', (req, res) => {
  console.log('user', req.body)
  app.allUsers.find({ email: req.body.email, password: req.body.password }).toArray((err, doc) => {
    if (err) throw err;
    if (doc.length > 0) {
       console.log('已经注册过，直接登录')
       res.redirect('/login')
    } else {
       app.allUsers.insertOne(req.body, (err, doc) => {
        if (!err) {
          console.log('插入成功', doc)
          res.redirect('/login')
        } else {
          throw err 
        }
      })
    }
  })
})


app.listen(4343)

MongoClient.connect('mongodb://localhost:27017/', function (err, client) {
  if (err) throw err


    var db = client.db('users')
    const allUsers = db.collection('allUsers')
    if (!allUsers) {
      db.createCollection('allUsers', function (err, res) {
          if (err) throw err;
          console.log("创建集合!");
      });
    }
    app.allUsers= allUsers;
  
})