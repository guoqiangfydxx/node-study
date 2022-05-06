'use strict';
const { readFile } = require('fs/promises');
const { WASI } = require('wasi');
const { argv, env } = require('process');
const { join } = require('path');

const wasi = new WASI({
  args: argv,
  env,
  preopens: {
    '/sandbox': '/some/real/path/that/wasm/can/access'
  }
});

// 一些 WASI 二进制文件需要：
//   const importObject = { wasi_unstable: wasi.wasiImport };
const importObject = { wasi_snapshot_preview1: wasi.wasiImport };

(async () => {
  const wasm = await WebAssembly.compile(
    await readFile(join(__dirname, 'demo.wasm'))
  );
  const instance = await WebAssembly.instantiate(wasm, importObject);

  wasi.start(instance);
})();