'use strict';

const array = ['234', '432', '564', '6754', '123', '', '312'];

array.forEach(function(item) {
  if (item[0] == 2 || item[0] == 4)
  console.log(item);
});

// Выводим простые числа в столбик и подставляем делитель числа

primeNumbers:
for (let n = 2; n <= 100; n++) {
  for (let i = 2; i < n; i++) {
      if (n % i == 0) continue primeNumbers;
  }

  console.log(n + '. Делители этого числа: 1 и ' + n);
}