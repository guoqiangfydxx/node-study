#! /usr/bin/env node
const { program } = require('commander')
program.version('1.0.1')
program.command('help').description('显示使用帮助').action(() => {
  program.outputHelp();
})

program.command('create [dir]').description('创建一个空的博客').action(require('../lib/create'))

program.command('preview [dir]').description('实时预览').action(require('../lib/preview'))

program.command('build [dir]').description('生成静态网站html').option('-o, --output <dir>', '生成静态的html目录').action(require('../lib/build'))

program.parse(process.argv)