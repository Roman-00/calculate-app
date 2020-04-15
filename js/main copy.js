'use strict';

const start = document.getElementById('start');
const cancel = document.getElementById('cancel');
const calc = document.querySelector('.calc');

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
let expensesItems = document.querySelectorAll('.expenses-items');
let incomeItems = document.querySelectorAll('.income-items');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const targetAmount = document.querySelector('.target-amount');
let periodAmount = document.querySelector('.period-amount');
const range = document.querySelector('.range');
let periodSelect = document.querySelector('.period-select');
const incomeItem = document.querySelectorAll('.income-items');

const isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const isString = function(n) {
  return (typeof n === 'string' && !(isNumber(n)) && n.trim() !== '');
};

const appData = {
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  incomeMonth: 0,
  income: {},
  addIncome: [],
  question: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposite: 0,
  moneyDeposit: 0,
  start: function() {

    if(salaryAmount.value === '') {
      start.disabled = true;
      return;
    }
    this.budget = +salaryAmount.value;

    appData.getExpenses();
    appData.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    
    this.showResult();

    const dataInputText = calc.querySelectorAll('.data input[type="text"]');
        const dataInputTextArray = Array.prototype.slice.call(dataInputText);
        dataInputTextArray.forEach(function (input) {
        input.setAttribute('readonly', true);
    });
    start.style.display = 'none';
    cancel.style.display = 'block';
    periodSelect.addEventListener('input', this.showResult.bind(appData));
  },
  showResult: function() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = Math.ceil(this.budgetDay);
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(',');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcSavedMoney();
  },
  addExpensesBlock: function() {
    let cloneExpensesItems = expensesItems[0].cloneNode(true);
      cloneExpensesItems.querySelector('.expenses-title').value = '';
      cloneExpensesItems.querySelector('.expenses-amount').value = '';
    expensesItems[0].parentNode.insertBefore(cloneExpensesItems, btnPlusExpensesAdd);
    expensesItems = document.querySelectorAll('.expenses-items');
    if(expensesItems.length === 3) {
      btnPlusExpensesAdd.style.display = 'none';
    }
  },
  addIncomeBlock: function() {
    let cloneIncomeItems = incomeItems[0].cloneNode(true);
      cloneIncomeItems.querySelector('.income-title').value = '';
      cloneIncomeItems.querySelector('.income-amount').value = '';
    incomeItems[0].parentNode.insertBefore(cloneIncomeItems, btnPlusIncomeAdd);
    incomeItems = document.querySelectorAll('.income-items');
    if(incomeItems.length === 3) {
      btnPlusIncomeAdd.style.display = 'none';
    }
  },
  getExpenses: function() {
    expensesItems.forEach(function(item) {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if(itemExpenses !== '' && cashExpenses !== '') {
        appData.expenses[itemExpenses] = +cashExpenses;
      }
    });
  },
  getIncome: function() {
    incomeItems.forEach(function(item) {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if(itemIncome !== '' && cashIncome !== '') {
        appData.income[itemIncome] = cashIncome;
      }
    });
    for (let key in this.income) {
        this.incomeMonth += +this.income[key];
    }
  },
  getAddExpenses: function () {
    let addExpenses = additionalExpensesItem.value.split(', ');
    addExpenses.forEach(function(item) {
      item = item.trim();
      if(isString(item) !== '') {
        appData.addExpenses.push(item);
      }
    });
  },
  getAddIncome: function () {
    additionalIncomeItem.forEach(function (item) {
      let itemValue = item.value.trim();
      if(isString(itemValue) !== '') {
        appData.addIncome.push(itemValue);
      }
    });
  },
  getExpensesMonth: function() {
    for (let key in this.expenses) {
        this.expensesMonth += +this.expenses[key];
    }
  },
  getBudget: function(){
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  },
  getTargetMonth: function(){
    return Math.ceil(targetAmount.value / this.budgetMonth);
  },
  getStatusIncome: function () {
    if(this.budgetDay >= 1200) {
      return ('У вас высокий уровень дохода');
    } else if (this.budgetDay >= 600) {
      return ('У вас средний уровень дохода');
    } else if (this.budgetDay >= 0) {
      return ('К сожалению у вас уровень дохода ниже среднего');
    } else {
      return ('Что-то пошло не так');
    }
  },
  getInfoDeposit: function() {
    if(this.deposit){
      this.percentDeposite = prompt('Какой годовой процент?');
      while (!isNumber(this.percentDeposite)) {
        this.percentDeposite = prompt('Какой годовой процент?');
      }

      this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      while (!isNumber(this.moneyDeposit)) {
        this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      }
    }
  },
  calcSavedMoney: function () {
    return this.budgetMonth * periodSelect.value;
  },
  changlePeriodSelect: function() {
    let asignValue = function () {
      incomePeriodValue.value = appData.calcSavedMoney();
    };
    asignValue();

    periodAmount.textContent = periodSelect.value;
  },
  reset: function() {
    const calcFormInputs = calc.querySelectorAll('input');
    const calcFormInputsArray = Array.prototype.slice.call(calcFormInputs);
    calcFormInputsArray.forEach(function (input) {
        input.value = '';
        input.removeAttribute('readonly');
    });
    start.style.display = 'block';
    cancel.style.display = 'none';
    start.disabled = true;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    periodSelect.value = 1;
    periodAmount.textContent = '1';
  },
};

start.addEventListener('click', appData.start.bind(appData));
cancel.addEventListener('click', appData.reset.bind(appData));

btnPlusExpensesAdd.addEventListener('click', appData.addExpensesBlock);
btnPlusIncomeAdd.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.changlePeriodSelect);



salaryAmount.addEventListener('input', () => {
  if (salaryAmount.value !== '') {
    start.disabled = false;    
   } else {
    start.disabled = true;    
   }
});

//Cлово с большой буквы и разделены запятой и пробелом
let newStr = appData.addExpenses;
newStr.forEach(function(element, item) {
  let result;
  element = element.trim();
  result = element.replace(element[0], element[0].toUpperCase()); 
  newStr[item] = result;
});
/*if (appData.getTargetMonth() > 0) {
console.log('Цель будет достигнута за ' + Math.ceil(appData.getTargetMonth()) + ' месяцев');
} else {
  console.log('Цель не будет достигнута!');
}*/
