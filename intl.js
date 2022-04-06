const january = new Date(9e8);
const english = new Intl.DateTimeFormat('en', { month: 'long' });
const spanish = new Intl.DateTimeFormat('es', { month: 'long' });

console.log(english.format(january));
// 打印 "January"
console.log(spanish.format(january));
// 在 small-icu 上打印 "M01"
// 应该打印 "enero"