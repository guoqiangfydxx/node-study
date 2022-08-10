const Comment = require('../models').Comment
// 添加一条评论过
exports.addComment = data => {
  return Comment.create(data)
}

// 根据话题id来获取对应的评论
exports.getCommentsByTopicId = id => {
  return Comment.find({ topic_id: id }).sort('updated_at').exec()
}