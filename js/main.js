'use strict';

const weekDays = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
let date = new Date().getDay() ;
let arr = [];

weekDays.forEach((el, i) => {
  arr.push(el);

  if (date === i) {
    arr[i] = el.italics();
  } 
  if (el === 'вс' || el === 'сб') {
    arr[i] = el.bold();
  }   
  if ((el === 'вс' && date === i) || (el === 'сб' && date === i)) {
    arr[i] = el.italics().bold();
  } 
});

document.write(arr.join('\n'));