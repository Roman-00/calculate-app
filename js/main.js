'use strict';

const weekDays = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
const styleWeek = [
    'font-style: italic;',
    'font-weight: bold;'
];

const date = new Date();

weekDays.forEach(function(element, item) {
    if (item < 5) {
        if (item == date.getDay() - 1) {
            console.log('%c' + element, styleWeek[1]);
        } else {
            console.log(element);
        }
    } else {
        if (item == date.getDay() - 1) {
            console.log('%c' + element, styleWeek[0] + styleWeek[1]);
        } else {
            console.log('%c' + element, styleWeek[0]);
        }
    }
});