
const path = require('path')
const MarkdownIt = require('markdown-it')
const fs = require('fs')
const swig = require('swig')
const rd= require('rd')
const md = new MarkdownIt({
  html: true,
  langPrefix: 'code-'
})
function stripExtName(name) {
  let i = 0 - path.extname(name).length
  if (i === 0) {
    i = name.length
  }
  return name.slice(0, i)
}

function markdownToHTML(content) {
  return md.render(content || '')
}

function parseSourceContent(data) {
  const split = '---\n'
  const i = data.indexOf(split)
  const info = {}
  let content = ''
  if (i !== -1) {
    const j = data.indexOf(split, i + split.length)
    if (j !== -1) {
      const str = data.slice(i + split.length, j).trim()
      content = data.slice(j + split.length)
      str.split('\n').forEach(item => {
        const index = item.indexOf(':')
        if (index !== -1) {
          const name = item.slice(0, index).trim()
          const value = item.slice(index + 1).trim()
          info[name] = value;
        }
      })
    }
  }
  info.source = content;
  return info;
}

// 遍历所有文章
function eachSourceFile (sourceDir, callback) {
  rd.eachFileFilterSync(sourceDir, /\.md$/, callback);
}

// 渲染模板
function renderFile (file, data) {
  return swig.render(fs.readFileSync(file).toString(), {
    filename: file,
    autoescape: false,
    locals: data
  });
}

function renderPost (dir, file) {
  var content = fs.readFileSync(file).toString();
  var post = parseSourceContent(content.toString());
  console.log('post', post)
  post.content = markdownToHTML(post.source);
  post.layout = post.layout || 'post';
  // var config = loadConfig(dir);
  var layout = path.resolve(dir, '_layout', 'post.html');
  var html = renderFile(layout, {
    // config: config,
    post: post
  });
  return html;
}

function renderIndex (dir) {
  var list = [];
  var sourceDir = path.resolve(dir, '_posts');
  eachSourceFile(sourceDir, function (f, s) {
    var source = fs.readFileSync(f).toString();
    var post = parseSourceContent(source);
    post.timestamp = new Date(post.date);
    post.url = '/posts/' + stripExtName(f.slice(sourceDir.length + 1)) + '.html';
    list.push(post);
  });

  list.sort(function (a, b) {
    return b.timestamp - a.timestamp;
  });

  // var config = loadConfig(dir);
  var layout = path.resolve(dir, '_layout', 'index.html');
  var html = renderFile(layout, {
    // config: config,
    posts: list
  });
  return html;
}

// 输出函数
exports.renderPost = renderPost;
exports.renderIndex = renderIndex;
exports.stripExtname = stripExtName;
exports.eachSourceFile = eachSourceFile;
// exports.loadConfig = loadConfig;