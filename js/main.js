const num = 266219;

const res = String(num).split('').reduce((multiplyсation, current) => multiplyсation * current, 1);
console.log(res);

const exp = res ** 3;
console.log(exp);

console.log(String(exp).slice(0, 2));