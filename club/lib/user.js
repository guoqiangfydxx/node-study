const User = require('../models').User
// 新建用户
exports.addUser = data => {
  return User.create(data)
}
// 通过id来获取用户
exports.getUserById = id => {
  return User.findById(id).exec()
}
// 通过name来获取对应的用户信息
exports.getUserByName = name => {
  return User.findOne({name: name}).exec();
}