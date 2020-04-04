'use strict';
const isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

let money;
const income = 'Создание сайтов';
const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', '');
const deposit = confirm('Есть ли у вас депозит в банке?');
const mission = 1000000;
const period = 12;
/*const expenses1 = prompt('Введите обязательную статью расходов', ''),
      amount1 = +prompt('Во сколько это обойдется?', ''),
      expenses2 = prompt('Введите обязательную статью расходов', ''),
      amount2 = +prompt('Во сколько это обойдется?', '');*/

const start = function() {
  do {
    money = prompt('Ваш месячный доход?');
  }
  while(!isNumber(money));
}

start();

const showTypeOf = function (data) {
  console.log(typeof(data));
}

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

const expenses = [];

console.log(income.length);

console.info('Период равен ' + period + ' месяцев');
console.info('Цель накопить ' + mission + ' KZT');

console.log(addExpenses.toLowerCase().split(', '));


const getExpensesMonth = function() {
  let sum = 0;

  for(let i = 0; i < 2; i++) {

    expenses[i] = prompt('Введите обязательную статью расходов', '');
    let expense = +prompt('Во сколько это обойдется?');
    if (isNumber(expense)) {
      sum += expense;
    }
  //return amount1 + amount2;
  };
  return sum;
};

const expensesAmount = getExpensesMonth();

console.log('Расходы за месяц ' + expensesAmount + ' KZT');

const getAccumulatedMonth = function() {
  return money - expensesAmount;
};
console.log('Бюджет на месяц ' + getAccumulatedMonth() + ' KZT');

const accumulatedMonth = getAccumulatedMonth();

const getTargetMonth = function() {
  return Math.ceil(mission / accumulatedMonth);
};

console.log(getTargetMonth() < 0 ? 'Цель не будет достигнута' : `Цель будет достигнута за ${getTargetMonth()} мес`);


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