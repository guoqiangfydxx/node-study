const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const UserScheme = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  gender: { type: String, required: true },
  signature: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
})
UserScheme.index({ name: 1})
module.exports = mongoose.model('User', UserScheme)