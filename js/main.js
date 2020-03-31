'use strict'

const lang = 'ru';

const daysWeekRu = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
const daysWeekEn = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];


// вывод дней недели через условия if & else
if (lang === 'ru') {
  console.log(daysWeekRu);
} else if (lang === 'en') {
  console.log(daysWeekEn);
}

// вывод дней недели через switch case
switch (lang) {
  case 'ru':
    console.log(daysWeekRu);
    break;
  case 'en':
    console.log(daysWeekEn);
    break;
}

// вывод дней недли через многомерный массив

const langs = ['ru', 'en'];
const langsId = langs.indexOf(lang);
const arrDaysWeek = [
  daysWeekRu,
  daysWeekEn
];

console.log(arrDaysWeek[langsId]);


const namePerson = 'Евгений',
      positionPerson = namePerson == 'Артем' ? 'директор': namePerson == 'Максим' ? 'преподаватель' : 'студент';

console.log(positionPerson);