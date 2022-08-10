const Topic = require('../models').Topic
const cache = require('co-cache')({
  expire: 10000
})

// 新增话题
exports.addTopic = data => {
  return Topic.create(data)
}
// 通过id来获取话题，并使pv加1
exports.getTopicById = id => {
  return Topic.findByIdAndUpdate(id, { $inc: { pv: 1 }}).exec()
}

// 获取用户所有话题
exports.getTopicsByName = name => {
  return Topic.find({'user.name': name }).sort('-updated_at').exec()
}

// 通过id来增加一个话题的评论数
exports.incCommentByI = id => {
  return Topic.findByIdAndUpdate(id, { $inc: { comment: 1 }}).exec()
}

// 查询最新5条微评论的话题
exports.getNoReplyTopics = cache(() => {
  return Topic.find({ comment: 0}).sort('-updated_at').limit(5).select('title').exec();
})

// 获取不同标签的话题数
exports.getTopicsCount = cache((tab) => {
  const query = {}
  if (tab) {
    query.tab = tab;
  }
  return Topic.count(query).exec()
}, {
  key: function(tab) {
    tab = tab || 'all'
    return this.name + ":" + tab;
  }
})

// 通过标签和页面获取10个话题
exports.getTopicByTab = cache((tab, p) => {
  const query = {}
  if (tab) {
    query.tab = tab;
  }
  return Topic.find(query).skip((p-1) * 10).sort('-updated_at').limit(10).select('-content').exec()
}, {
  key: function(tab, p) {
    tab = tab || 'all'
    return this.name + ':' + tab + ':' + p;
  }
})