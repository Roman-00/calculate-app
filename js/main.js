const num = 266219;

const arr = num.toString().split('').map(n=> Number(n));

const result = arr.reduce((start, end) => {
  return start * end;
});

console.log(result);

// возводим полученное число в 3 степень
console.log(result ** 3);

// выводим первые 2 числа 
const res = 2176782336;

const sum = res.toString().split('');

console.log(sum[0]);
console.log(sum[1]);
