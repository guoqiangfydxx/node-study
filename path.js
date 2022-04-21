const { Console } = require('console');
const path = require('path');

console.log('basename', path.basename('/foo/bar/baz/adsd/dsh.html'))
console.log('basename', path.basename('/foo/bar/baz/adsd/dsh.HTML', '.HTML'))

console.log('delimiter', path.delimiter)
console.log('path', process.env.PATH)

console.log('dirname', path.dirname('/foo/bar/baz/asdf/quux.html'))

console.log('extname', path.extname('.index'))

console.log('isAbsolute', path.isAbsolute('.'))

console.log('join', path.join('foo','kfkkf', 'baar'))

console.log('parse', path.parse('/home/user/dir/file.txt'))

console.log('relative', path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb'))

console.log('reoslve', path.resolve('/foo/bar', 'tmp/file/'))

console.log('resolve', path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif'))

console.log('sep', path.sep)

console.log('win32', path.win32)