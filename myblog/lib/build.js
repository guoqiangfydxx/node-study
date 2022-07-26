const path = require('path')
const utils = require('./util')
const fse = require('fs-extra')

module.exports = function(dir, options) {
  dir = dir || '.'
  const outputDir = path.resolve(options.output || dir)
  const outputFile = (file, content) => {
    fse.outputFile(file, content)
  }

  const sourceDir = path.resolve(dir, '_posts')
  utils.eachSourceFile(sourceDir, (f, s) => {
    const html = utils.renderPost(dir, f)
    var relativeFile = utils.stripExtname(f.slice(sourceDir.length + 1)) + '.html';
    const file = path.resolve(outputDir, 'posts', relativeFile)
    outputFile(file, html)
  })

  // 生成首页
  var htmlIndex = utils.renderIndex(dir);
  var fileIndex = path.resolve(outputDir, 'index.html');
  outputFile(fileIndex, htmlIndex);
}