'use strict';

const startButton = document.getElementById('start');
const btnPlusIncomeAdd = document.getElementsByTagName('button')[0];
const btnPlusExpensesAdd = document.getElementsByTagName('button')[1];
const depositCheck = document.querySelector('#deposit-check');
const additionalIncomeItem = document.querySelectorAll('.additional_income-item');

// Получение данных с правой стороны
const budgetMonthValue = document.querySelector('.budget_month-value');
const budgetDayValue = document.querySelector('.budget_day-value');
const expensesMonthValue = document.querySelector('.expenses_month-value');
const additionalIncomeValue = document.querySelector('.additional_income-value');
const additionalExpensesValue = document.querySelector('.additional_expenses-value');
const incomePeriodValue = document.querySelector('.income_period-value');
const targetMonthValue = document.querySelector('.target_month-value');

// Получение остальных инпутов для ввода
const salaryAmount = document.querySelector('.salary-amount');
const incomeTitle = document.querySelector('.income-title');
const incomeAmount = document.querySelector('.income-amount');
const expensesTitle = document.querySelector('.expenses-title');
const expensesAmount = document.querySelector('.expenses-amount');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const targetAmount = document.querySelector('.target-amount');
const range = document.querySelector('.range');
const periodAmount = document.querySelector('.period-amount');



const isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const isString = function(n) {
  return (typeof n === 'string' && !(isNumber(n)) && n.trim() !== '');
};

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
  percentDeposite: 0,
  moneyDeposit: 0,
  mission: 1000000,
  period: 12,
  asking: function() {

    if(confirm('Есть ли у вас дополнительный источник заработка?')) {
      let itemIncome = prompt('Какой у вас дополнительный заработок?');
      while(!isString(itemIncome)) {
        itemIncome = prompt('Какой у вас дополнительный заработок?');
      }
      let cashIncome = prompt('Сколько в месяц вы на этом зарабатываете');
      while(!isNumber(cashIncome)) {
        cashIncome = prompt('Сколько в месяц вы на этом зарабатываете');
      }
      appData.income[itemIncome] = cashIncome;
    }

    const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'кино, интернет, театр');
          appData.addExpenses = addExpenses.toLowerCase().split(', ');
          appData.deposit = confirm('Есть ли у вас депозит в банке?');
          for (let i = 0; i < 2; i++) {
            let question = prompt('Введите обязательную статью расходов');
            while(!isString(question)) {
              question = prompt('Введите обязательную статью расходов');
            }
            let answer = prompt('Во сколько это обойдется?');
            while(!isNumber(answer)) {
                answer = prompt('Во сколько это обойдется?');
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
  getInfoDeposit: function() {
    if(appData.deposit){
      appData.percentDeposite = prompt('Какой годовой процент?');
      while (!isNumber(appData.percentDeposite)) {
        appData.percentDeposite = prompt('Какой годовой процент?');
      }

      appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      while (!isNumber(appData.moneyDeposit)) {
        appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      }
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
console.log('Цель будет достигнута за ' + Math.ceil(appData.getTargetMonth()) + ' месяцев');
} else {
  console.log('Цель не будет достигнута!');
}

console.log(appData.getStatusIncome());

//Cлово с большой буквы и разделены запятой и пробелом
let newStr = appData.addExpenses;
newStr.forEach(function(element, item) {
  let result;
  element = element.trim();
  result = element.replace(element[0], element[0].toUpperCase()); 
  newStr[item] = result;
});
console.log(newStr.join(', '));

/*for (let key in appData) {
  console.log('Наша программа включает в себя данные: ' + key + ' - ' + appData[key]);
}*/

/*console.log("expenses", appData.expenses);*/

// каждое слово с большой буквы слова разделены запятой и пробелом
