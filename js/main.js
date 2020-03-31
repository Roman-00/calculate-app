'use strict';
const money = prompt('Ваш месячный доход?', '');
const income = 'Создание сайтов';
const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', '');
const deposit = confirm('Есть ли у вас депозит в банке?');
const expenses1 = prompt('Введите обязательную статью расходов', '');
const amount1 = +prompt('Во сколько это обойдется?', '');
const expenses2 = prompt('Введите обязательную статью расходов', '');
const amount2 = +prompt('Во сколько это обойдется?', '');
const mission = 1000000;
const period = 12;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(income.length);

console.info('Период равен ' + period + ' месяцев');
console.info('Цель накопить ' + mission + ' KZT');

console.log(addExpenses.toLowerCase().split(', '));

const budgetMonth = money - (amount1 + amount2);
console.log('Бюджет на месяц: ' + budgetMonth + ' KZT');

const budgetDay = budgetMonth / 30;
console.log('Бюджет на день: ' + Math.floor(budgetDay) + ' KZT');

const missionComplete = Math.ceil(mission / budgetMonth);
console.log('Цель будет достигнута за ' + missionComplete + ' месяца');

let yourIncome = '';
if (budgetDay >= 1200) {
  yourIncome = 'У вас высокий уровень дохода';
} else if (budgetDay >= 600) {
  yourIncome = 'У вас средний уровень дохода';
} else if (budgetDay >= 0) {
  yourIncome = 'К сожалению у вас уровень дохода ниже среднего';
} else {
  yourIncome = 'Что-то пошло не так';
}

console.log(yourIncome);
