const assertStrict = require('assert').strict

assertStrict.deepEqual([[[1, 2, 3]], 4, 5], [[[1, 2, 3]], 4, 5]);

const assert = require('assert');

// 生成 AssertionError，以便稍后比较错误信息：
const { message } = new assert.AssertionError({
  actual: 1,
  expected: 2,
  operator: 'strictEqual'
});

// 验证错误的输出：
try {
  assert.strictEqual(1, 2);
} catch (err) {
  assert(err instanceof assert.AssertionError);
  assert.strictEqual(err.message, message);
  assert.strictEqual(err.name, 'AssertionError');
  assert.strictEqual(err.actual, 1);
  assert.strictEqual(err.expected, 2);
  assert.strictEqual(err.code, 'ERR_ASSERTION');
  assert.strictEqual(err.operator, 'strictEqual');
  assert.strictEqual(err.generatedMessage, true);
}



const tracker = new assert.CallTracker();

function func() {}

// callfunc() 必须在 tracker.verify() 之前恰好被调用 1 次。
const callsfunc = tracker.calls(func, 2);

callsfunc();

callsfunc();

// // 调用 tracker.verify() 并验证是否所有 tracker.calls() 函数都已被准确调用。
// process.on('exit', () => {
//   tracker.verify();
// });

// console.log(tracker.report());

assert.doesNotMatch('I will fail', /fai8l/, 'sfjsdfhsd');
assert.doesNotMatch('123', /pass/, '必须为字符串才可以')