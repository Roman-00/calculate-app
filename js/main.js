let num = 266219;
let res = 1;

num = num.toString();

for (let i = 0; i < num.length; i++ ) {
  res *= num[i];
}

console.log(res);
console.log(res ** 3);
console.log((res ** 3).toString().slice(0, 2));