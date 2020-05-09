'use strict';

const start = document.getElementById('start');
const cancel = document.getElementById('cancel');
const calc = document.querySelector('.calc');

const btnPlusIncomeAdd = document.getElementsByTagName('button')[0];
const btnPlusExpensesAdd = document.getElementsByTagName('button')[1];

// Депозит
const depositCheck = document.querySelector('#deposit-check');
const depositBank = document.querySelector('.deposit-bank');
const depositAmount = document.querySelector('.deposit-amount');
const depositPercent = document.querySelector('.deposit-percent');

// Получение данных с правой стороны
const additionalIncomeItem = document.querySelectorAll('.additional_income-item');
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

const incomeAdd = document.querySelector('.income_add');
const expensesAdd = document.querySelector('.expenses_add');

const isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const isString = function(n) {
  return (typeof n === 'string' && !(isNumber(n)) && n.trim() !== '');
};


const inputRefresh = () => {
  let inputString = document.querySelectorAll('[placeholder="Наименование"]');
  let inputNumber = document.querySelectorAll('[placeholder="Сумма"]');

  inputString.forEach(element => {
    element.addEventListener('input',()=> {
      element.value = element.value.replace(/[^а-яА-Я ,.!]/,'');
    });
  });
  inputNumber.forEach(element => {
    element.addEventListener('input',()=> {
      element.value = element.value.replace(/[^0-9]/,'');
    });
  });
};
inputRefresh();
const disabledInputText = () => {
  let inpitText = document.querySelectorAll('[type="text"]:not(.result-total)');

  inpitText.forEach(element => {
    element.disabled = true;
  });
  start.style.display = 'none';
  cancel.style.display = 'block';
  incomeAdd.disabled = true;
  expensesAdd.disabled = true;
};

class AppData {
  constructor(){
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
    this.getInfoDeposit();
    this.getBudget();
    
    this.showResult();

    this.addCook();
  
    const dataInputText = calc.querySelectorAll('.data input[type="text"]');
        const dataInputTextArray = Array.prototype.slice.call(dataInputText);
        dataInputTextArray.forEach((input) => {
        input.setAttribute('readonly', true);
    });
    start.style.display = 'none';
    cancel.style.display = 'block';
    periodSelect.addEventListener('input', this.showResult.bind(this));
  }

  removeCook() {

    const day = -1;

    this.setCookie('budgeMonthValue', budgetMonthValue, day);
    this.setCookie('budgetDayValue', budgetDayValue.value, day);
    this.setCookie('expensesMmonthValue', expensesMonthValue, day);
    this.setCookie('additionalIncomeValue', additionalIncomeValue.value, day);
    this.setCookie('additionalExpensesValue', additionalExpensesValue.value, day);
    this.setCookie('incomePeriodValue', incomePeriodValue.value, day);
    this.setCookie('targetMonthValue', targetMonthValue.value, day);
    this.setCookie('isLoad', 'true', day);

    localStorage.clear();
  }

  addCook() {
    this.setCookie('budgeMonthValue', budgetMonthValue.value);
    this.setCookie('budgetDayValue', budgetDayValue.value);
    this.setCookie('expensesMmonthValue', expensesMonthValue.value);
    this.setCookie('additionalIncomeValue', additionalIncomeValue.value);
    this.setCookie('additionalExpensesValue', additionalExpensesValue.value);
    this.setCookie('incomePeriodValue', incomePeriodValue.value);
    this.setCookie('targetMonthValue', targetMonthValue.value);
    this.setCookie('isLoad', 'true');

    localStorage.setItem('budgeMonthValue', budgetMonthValue.value);
    localStorage.setItem('budgetDayValue', budgetDayValue.value);
    localStorage.setItem('expensesMmonthValue', expensesMonthValue.value);
    localStorage.setItem('additionalIncomeValue', additionalIncomeValue.value);
    localStorage.setItem('additionalExpensesValue', additionalExpensesValue.value);
    localStorage.setItem('incomePeriodValue', incomePeriodValue.value);
    localStorage.setItem('targetMonthValue', targetMonthValue.value);
    localStorage.setItem('isLoad', true);
  }

  setCookie(cname, cvalue, exdays = 1) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  load() {
    const arr = document.cookie.split(';');
    const newCookie = {};
    arr.forEach(el => {
      let item = el.trim().split('=');
      newCookie[item[0]] =  item[1];  
      if (localStorage.getItem(item[0]) !== item[1]) {
        this.removeCook();
        return;
      }
    });

    if (localStorage.length !== 0) {
      budgetMonthValue.value = localStorage.getItem('budgeMonthValue');
      budgetDayValue.value = localStorage.getItem('budgetDayValue');
      expensesMonthValue.value = localStorage.getItem('expensesMmonthValue');
      additionalExpensesValue.value = localStorage.getItem('additionalIncomeItems');
      additionalIncomeValue.value = localStorage.getItem('additionalIncomeValue');
      additionalExpensesValue.value = localStorage.getItem('additionalExpensesValue');
      incomePeriodValue.value = localStorage.getItem('incomePeriodValue');
      targetMonthValue.value = localStorage.getItem('targetMonthValue');
      
      depositCheck.disabled = true;
      periodSelect.disabled = true;
      disabledInputText();
    }

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
        this.expenses[itemExpenses] = +cashExpenses;
      }
    });
  }

  getIncome () {
    const _this = this;
    incomeItems.forEach((item) => {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if(itemIncome !== '' && cashIncome !== '') {
        this.income[itemIncome] = cashIncome;
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

  getBudget (){
    const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  }

  getTargetMonth (){
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

  changePercent() {
    const valueSelect = this.value;
    if(valueSelect === 'other') {
      depositPercent.style.display = 'inline-block';
    } else {
      depositPercent.style.display = 'none';
      depositPercent.value = valueSelect;
    }
  }

  depositHandler () {
    if(depositCheck.checked) {
      depositBank.style.display = 'inline-block';
      depositAmount.style.display = 'inline-block';
      this.deposit = true;
      depositBank.addEventListener('change', this.changePercent);
    } else {
      depositBank.style.display = 'none';
      depositAmount.style.display = 'none';
      depositBank.value = '';
      depositAmount.value = '';
      depositPercent.value = '';
      this.deposit = false;
      depositBank.removeEventListener('change', this.changePercent);
    }
  }

  getInfoDeposit () {
    if(this.deposit){
      this.percentDeposit = depositPercent.value;
      this.moneyDeposit = depositAmount.value;
      while (isNaN(depositPercent.value) || depositPercent.value <= 0 || depositPercent.value > 100)  {
        alert('Введите корректное значение в поле проценты'); break;
      }
      depositPercent.value = '';
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
    depositCheck.disabled = true;
		depositBank.disabled = true;
		depositCheck.style.display = 'none';
  }

  eventsListeners () {
    start.addEventListener('click', this.start.bind(this));
    cancel.addEventListener('click',  this.reset.bind(this));
    depositCheck.addEventListener('change', this.depositHandler.bind(this));
  
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
appData.load();
console.log(appData);


/*if (appData.getTargetMonth() > 0) {
console.log('Цель будет достигнута за ' + Math.ceil(appData.getTargetMonth()) + ' месяцев');
} else {
  console.log('Цель не будет достигнута!');
}*/
