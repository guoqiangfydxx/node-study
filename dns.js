const dns = require('dns');
const { Resolver } = dns;

dns.lookup('www.baidu.com', (err, address, family) => {
  console.log('address: %j family: IPv%s', address, family);
});

console.log('ser', dns.getServers())

dns.lookupService('127.0.0.1', 8080, (err, hostname, service) => {
  console.log(hostname, service);
  // 打印: localhost ssh
});

dns.resolve4('www.baidu.com', (err, address) => {
  if (!err) {
    console.log('addd', address)
  }
})

dns.resolve6('www.nodejs.cn', (err, address) => {
  if (!err) {
    console.log('9--', address)
  }
})