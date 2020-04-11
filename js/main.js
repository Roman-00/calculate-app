'use strict';

const array = ['234', '432', '564', '6754', '123', '', '312'];

for (let i = 0; i < array.length; i++){
    
  let res = array[i];
    res = res.slice(0,1);

  if(res == 2 || res == 4){
      console.log(array[i]);
  }
}

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