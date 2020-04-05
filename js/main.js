'use strict';

const newFunction = function (argument) {
  if(typeof argument !== 'string') {
    console.log('Функция передает не строку!!');
  }

  // Условия убирают пробелы с обоих сторон и заменяются на ...
  let extension = argument.trim();
  if(extension.length > 30) {
    extension = extension.substring(0, 30) + '...';
  }

  return extension;
}

//newFunction(11);

console.log(newFunction('12345678901234567890asdqwezxcr 12345678901234567890'));