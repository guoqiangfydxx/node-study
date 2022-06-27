const express = require('express')
const mongodb = require('mongodb')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Scheme = mongoose.Schema
const app = express()
const ObjectId = mongodb.ObjectId;
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.set('views', process.cwd() + '/views')
app.set('view engine', 'jade')
console.log('cwd', process.cwd() + '/views')

const User = mongoose.model('MyUser', new Scheme({
  first: String,
  last: String,
  email: { type: String, unique: true},
  password: { type: String, index: true }
}))

app.use((req, res, next) => {
  console.log('loggedIn', app.get('id'))
  if (app.get('id')) {
    User.find({ _id: new ObjectId(app.get('id')) }, (err, doc) => {
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
  User.find({ email: req.body.email, password: req.body.password }, (err, doc) => {
    if(err) throw err;
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
  const user = new User(req.body)
  User.find({ email: req.body.email, password: req.body.password }, (err, doc) => {
    if (err) throw err;
    if (doc.length > 0) {
       console.log('已经注册过，直接登录')
       res.redirect('/login')
    } else {
      user.save((err, v) => {
        if (err) throw err;
        console.log('插入成功', v)
        res.redirect('/login')
      })
    }
  })
})


app.listen(4343)

mongoose.connect('mongodb://localhost:27017/users')