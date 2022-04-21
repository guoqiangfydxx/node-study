// const { performance } = require('perf_hooks');

// const obs = new PerformanceObserver((items) => {
//   console.log(items.getEntries()[0].duration);
//   performance.clearMarks();
// });
// obs.observe({ type: 'measure' });
// performance.measure('Start to Now');

// performance.mark('A');

// setTimeout(() => {
//   performance.measure('A to Now', 'A');

//   performance.mark('B');
//   performance.measure('A to B', 'A', 'B');
// }, 4000)

// const { eventLoopUtilization } = require('perf_hooks').performance;
// const { spawnSync } = require('child_process');

// setImmediate(() => {
//   const elu = eventLoopUtilization();
//   spawnSync('sleep', ['5']);
//   console.log(eventLoopUtilization(elu).utilization);
// });

// console.log('nodeTime', performance.nodeTiming)
// console.log('now', performance.now())
// console.log('timeOrigin', performance.timeOrigin)

// const {
//   performance,
//   PerformanceObserver
// } = require('perf_hooks');

// function someFunction() {
//   // return new Promise((resolve, reject) => {
//   //   setTimeout(resolve, 4000)
//   // })
//   console.log('kfjffff')
// }

// const wrapped = performance.timerify(someFunction);

// const obs = new PerformanceObserver((list) => {
//   console.log(list.getEntries()[0].duration);
//   obs.disconnect();
// });
// obs.observe({ entryTypes: ['function'] });

// // 将创建性能时间轴条目
// wrapped()


// const {
//   performance,
//   PerformanceObserver
// } = require('perf_hooks');

// const obs = new PerformanceObserver((perfObserverList, observer) => {
//   console.log(perfObserverList.getEntries());
//   /**
//    * [
//    *   PerformanceEntry {
//    *     name: 'test',
//    *     entryType: 'mark',
//    *     startTime: 81.465639,
//    *     duration: 0
//    *   },
//    *   PerformanceEntry {
//    *     name: 'meow',
//    *     entryType: 'mark',
//    *     startTime: 81.860064,
//    *     duration: 0
//    *   }
//    * ]
//    */
//   observer.disconnect();
// });
// obs.observe({ entryTypes: ['mark'] });

// performance.mark('test');
// performance.mark('meow');

const {
  performance,
  PerformanceObserver
} = require('perf_hooks');
const mod = require('module');

// Monkey 修补 require 函数
mod.Module.prototype.require =
  performance.timerify(mod.Module.prototype.require);
require = performance.timerify(require);

// 激活观察者
const obs = new PerformanceObserver((list) => {
  const entries = list.getEntries();
  entries.forEach((entry) => {
    console.log(`require('${entry[0]}')`, entry.duration);
  });
  obs.disconnect();
});
obs.observe({ entryTypes: ['function'], buffered: true });

require('os');
