const qs = require('querystring');

// console.log('encode', qs.parse('w=%D6%D0%CE%C4&foo=bar', null, null,
//                   { decodeURIComponent: gbkDecodeURIComponent }))

console.log('stringify', qs.stringify({ foo: 'bar', baz: 'qux' }, ';', ':'))