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

class AppData {
  constructor() {
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.incomeMonth = 0;
    this.income = {};
    this.addIncome = [];
    this.question = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposite = 0;
    this.moneyDeposit = 0;
  }

  start () {

    if(salaryAmount.value === '') {
      start.disabled = true;
      return;
    }
    this.budget = +salaryAmount.value;
  
    const _this = this;
  
    _this.getExpenses();
    _this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    
    this.showResult();
  
    const dataInputText = calc.querySelectorAll('.data input[type="text"]');
        const dataInputTextArray = Array.prototype.slice.call(dataInputText);
        dataInputTextArray.forEach((input) => {
        input.setAttribute('readonly', true);
    });
    start.style.display = 'none';
    cancel.style.display = 'block';
    periodSelect.addEventListener('input', this.showResult.bind(this));
  }

  showResult () {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = Math.ceil(this.budgetDay);
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(',');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcSavedMoney();
  }

  addExpensesBlock () {
    let cloneExpensesItems = expensesItems[0].cloneNode(true);
      cloneExpensesItems.querySelector('.expenses-title').value = '';
      cloneExpensesItems.querySelector('.expenses-amount').value = '';
    expensesItems[0].parentNode.insertBefore(cloneExpensesItems, btnPlusExpensesAdd);
    expensesItems = document.querySelectorAll('.expenses-items');
    if(expensesItems.length === 3) {
      btnPlusExpensesAdd.style.display = 'none';
    }
  }

  addIncomeBlock () {
    let cloneIncomeItems = incomeItems[0].cloneNode(true);
      cloneIncomeItems.querySelector('.income-title').value = '';
      cloneIncomeItems.querySelector('.income-amount').value = '';
    incomeItems[0].parentNode.insertBefore(cloneIncomeItems, btnPlusIncomeAdd);
    incomeItems = document.querySelectorAll('.income-items');
    if(incomeItems.length === 3) {
      btnPlusIncomeAdd.style.display = 'none';
    }
  }

  getExpenses () {
    const _this = this;
    expensesItems.forEach((item) => {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if(itemExpenses !== '' && cashExpenses !== '') {
        _this.expenses[itemExpenses] = +cashExpenses;
      }
    });
  }

  getIncome () {
    const _this = this;
    incomeItems.forEach((item) => {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if(itemIncome !== '' && cashIncome !== '') {
        _this.income[itemIncome] = cashIncome;
      }
    });
    for (let key in this.income) {
        this.incomeMonth += +this.income[key];
    }
  }

  getAddExpenses () {
    let addExpenses = additionalExpensesItem.value.split(', ');
    //const _this = this;
    addExpenses.forEach((item) => {
      item = item.trim();
      if(isString(item) !== '') {
        this.addExpenses.push(item);
      }
    });
  }

  getAddIncome () {
    //const _this = this;
    additionalIncomeItem.forEach((item) => {
      let itemValue = item.value.trim();
      if(isString(itemValue) !== '') {
        this.addIncome.push(itemValue);
      }
    });
  }

  getExpensesMonth () {
    for (let key in this.expenses) {
        this.expensesMonth += +this.expenses[key];
    }
  }

  getBudget () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  }

  getTargetMonth () {
    return Math.ceil(targetAmount.value / this.budgetMonth);
  }

  getStatusIncome () {
    if(this.budgetDay >= 1200) {
      return ('У вас высокий уровень дохода');
    } else if (this.budgetDay >= 600) {
      return ('У вас средний уровень дохода');
    } else if (this.budgetDay >= 0) {
      return ('К сожалению у вас уровень дохода ниже среднего');
    } else {
      return ('Что-то пошло не так');
    }
  }

  getInfoDeposit () {
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
  }

  calcSavedMoney () {
    return this.budgetMonth * periodSelect.value;
  }

  changlePeriodSelect () {
    let asignValue = () => {
      incomePeriodValue.value = appData.calcSavedMoney();
    };
    asignValue();
  
    periodAmount.textContent = periodSelect.value;
  }

  reset () {
    const calcFormInputs = calc.querySelectorAll('input');
    const calcFormInputsArray = Array.prototype.slice.call(calcFormInputs);
    calcFormInputsArray.forEach((input) => {
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
  }

  eventsListeners () {
    start.addEventListener('click', this.start.bind(this));
    cancel.addEventListener('click',  this.reset.bind( this));
  
    btnPlusExpensesAdd.addEventListener('click',  this.addExpensesBlock);
    btnPlusIncomeAdd.addEventListener('click',  this.addIncomeBlock);
    periodSelect.addEventListener('input',  this.changlePeriodSelect);
  
    salaryAmount.addEventListener('input', () => {
      if (salaryAmount.value !== '') {
        start.disabled = false;
       } else {
        start.disabled = true;
       }
    });
  }
}


const appData = new AppData();
appData.eventsListeners();


/*if (appData.getTargetMonth() > 0) {
console.log('Цель будет достигнута за ' + Math.ceil(appData.getTargetMonth()) + ' месяцев');
} else {
  console.log('Цель не будет достигнута!');
}*/
