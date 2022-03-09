// const { createHmac } = require('crypto');

// const secret = 'abcdefg';
// const hash = createHmac('sha256', secret)
//                .update('I love cupcakes')
//                .digest('hex');
// console.log(hash);

// const {
//   scrypt,
//   randomFill,
//   createCipheriv
// } = require('crypto');

// const algorithm = 'aes-192-cbc';
// const password = 'Password used to generate key';

// // 首先，将生成密钥。密钥长度取决于算法。
// // 在此示例中，用于 aes192，长度是 24 个字节（192 位）。
// scrypt(password, 'salt', 24, (err, key) => {
//   if (err) throw err;
//   // 然后，将生成随机的初始化向量
//   randomFill(new Uint8Array(16), (err, iv) => {
//     if (err) throw err;

//     // 一旦有了密钥和 iv，则可以创建和使用加密...
//     const cipher = createCipheriv(algorithm, key, iv);

//     let encrypted = '';
//     cipher.setEncoding('hex');

//     cipher.on('data', (chunk) => encrypted += chunk);
//     cipher.on('end', () => console.log(encrypted));

//     cipher.write('some clear text data');
//     cipher.end();
//   });
// });

// const {
//   scryptSync,
//   createDecipheriv,
// } = require('crypto');
// const { Buffer } = require('buffer');

// const algorithm = 'aes-192-cbc';
// const password = 'Password used to generate key';
// // 请改用异步的 `crypto.scrypt()`。
// const key = scryptSync(password, 'salt', 24);
// // IV 通常与密文一起传入。
// const iv = Buffer.alloc(16, 0); // 初始化向量。

// const decipher = createDecipheriv(algorithm, key, iv);

// // 使用相同的算法、密钥和 iv 加密。
// const encrypted =
//   'e5f79c5915c02171eec6b212d5520d44480993d7d622a7c4c2da32f6efda0ffa';
// let decrypted = decipher.update(encrypted, 'hex', 'utf8');
// decrypted += decipher.final('utf8');
// console.log(decrypted);


// const assert = require('assert');

// const {
//   createDiffieHellman,
// } = require('crypto');

// // 生成 Alice 的密钥...
// const alice = createDiffieHellman(2048);
// const aliceKey = alice.generateKeys();

// // 生成 Bob 的密钥...
// // @ts-ignore
// const bob = createDiffieHellman(alice.getPrime(), alice.getGenerator());
// const bobKey = bob.generateKeys();

// // 交换并生成密钥...
// const aliceSecret = alice.computeSecret(bobKey);
// const bobSecret = bob.computeSecret(aliceKey);

// // OK
// assert.strictEqual(aliceSecret.toString('hex'), bobSecret.toString('hex'));

const { createReadStream } = require('fs');
const { createHash } = require('crypto');
const { stdout } = require('process');

const hash = createHash('sha256');


hash.update('some data to hash');
console.log(hash.digest('hex'));

// console.log(hash.copy().digest('hex'))

// hash.update('two');
// console.log(hash.copy().digest('hex'));


// hash.update('three');
// console.log(hash.copy().digest('hex'));
// console.log(hash.digest('hex'));