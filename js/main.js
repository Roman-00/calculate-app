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

const showTypeOf = function (data) {
  console.log(typeof(data));
}

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log(income.length);

console.info('Период равен ' + period + ' месяцев');
console.info('Цель накопить ' + mission + ' KZT');

console.log(addExpenses.toLowerCase().split(', '));

const getExpensesMonth = function() {
  return amount1 + amount2;
};

console.log('Расходы за месяц ' + getExpensesMonth() + ' KZT');

const getAccumulatedMonth = function() {
  return money - getExpensesMonth();
};
console.log('Бюджет на месяц ' + getAccumulatedMonth() + ' KZT');

const accumulatedMonth = getAccumulatedMonth();

const getTargetMonth = function() {
  return Math.ceil(mission / accumulatedMonth);
};

console.log('Цель будет достигнута за ' + getTargetMonth() + ' месяца');


const budgetDay = accumulatedMonth / 30;

console.log('Бюджет на день: ' + Math.floor(budgetDay) + ' KZT');


const getStatusIncome = function () {
  if(budgetDay >= 1200) {
    return ('У вас высокий уровень дохода');
  } else if (budgetDay >= 600) {
    return ('У вас средний уровень дохода');
  } else if (budgetDay >= 0) {
    return ('К сожалению у вас уровень дохода ниже среднего');
  } else {
    return ('Что-то пошло не так');
  }
};

console.log(getStatusIncome());