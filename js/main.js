'use strict';

const array = ['234', '432', '564', '6754', '123', '', '312'];

array.forEach(element => {
  if (element[0] === '2' || element[0] === '4') {
    console.log(element);
  }
});

// Выводим простые числа в столбик и подставляем делитель числа

primeNumbers:
for (let i = 2; i < 100; i++) {
  for (let number = 2; number < i; number++) {
    if (i % number === 0) {
      continue primeNumbers;
    }    
  }
  console.log(i + ': делитель этого числа 1 и ' + i);
}