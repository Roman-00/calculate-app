const money = 225500;
const income = 'Создание сайтов';
const addExpenses = 'Налоги, Хостинг, Avacode, Интернет';
const deposit = true;
const mission = 5000000;
const period = 5;

console.log(typeof money);
console.log(typeof income);
console.log(addExpenses.length);
console.log(addExpenses.toLowerCase());
console.log(addExpenses.split(', '));
console.log(typeof deposit);
console.log('"Период равен ' + period + ' месяцев" ' + 'и ' + '"Цель заработать ' + mission + ' тенге"');


// Вычисление
const daileBudget = money / 30;
const budgetDay = daileBudget;

console.log(budgetDay);


