'use strict';
const isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

let money,
    start = function() {
      do {
        money = prompt('Ваш месячный доход?');
      }
      while(!isNumber(money));
    }

  start();

const appData = {
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  income: {},
  addIncome: [],
  question: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 1000000,
  period: 12,
  asking: function() {
    const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'кино, интернет, театр');
          appData.addExpenses = addExpenses.toLowerCase().split(', ');
          appData.deposit = confirm('Есть ли у вас депозит в банке?');
          for (let i = 0; i < 2; i++) {
            let question = prompt("Введите обязательную статью расходов"),
                answer = prompt("Во сколько это обойдется?");
            while(!isNumber(answer)) {
                answer = prompt("Во сколько это обойдется?");
            }
            appData.expenses[question] = +answer;
        }
  },
  getExpensesMonth: function() {
    for (let key in appData.expenses) {
      appData.expensesMonth += +appData.expenses[key];
    }
  },
  getBudget: function(){
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getTargetMonth: function(){
    return appData.mission / appData.budgetMonth;
  },
  getStatusIncome: function () {
    if(appData.budgetDay >= 1200) {
      return ('У вас высокий уровень дохода');
    } else if (appData.budgetDay >= 600) {
      return ('У вас средний уровень дохода');
    } else if (appData.budgetDay >= 0) {
      return ('К сожалению у вас уровень дохода ниже среднего');
    } else {
      return ('Что-то пошло не так');
    }
  },
  calcSavedMoney: function () {
    return appData.budgetMonth * appData.period;
  }
};


appData.asking();
appData.getExpensesMonth();
appData.getBudget();  

console.log('Расходы за месяц: ' + appData.expensesMonth + ' KZT');
if (appData.getTargetMonth() > 0) {
console.log("Цель будет достигнута за " + Math.ceil(appData.getTargetMonth()) + ' месяцев');
} else {
  console.log('Цель не будет достигнута!');
}

console.log(appData.getStatusIncome());

/*for (let key in appData) {
  console.log('Наша программа включает в себя данные: ' + key + ' - ' + appData[key]);
}*/

/*console.log("expenses", appData.expenses);*/