const mongoose = require('mongoose')
// const config = require('config-lite').mongodb
mongoose.connect('', (err) => {
  if (err) {
    console.error('connect to %s error: ', '', err.message)
    process.exit(1)
  }
})
exports.User = require('./user')
exports.Topic = require('./topic')
exports.Comment = require('./comment')