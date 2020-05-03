'use strict';

const body = document.querySelector('body');

const DomElement = function (selector, height, width, bg, fontSize, position) {
  this.selector = selector;
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;
  this.position = position;
};

function keyDownHandler(event)  {
  const div = document.querySelector('.block');
  let left = parseInt(div.style.left);
  let top = parseInt(div.style.top);
  if (!isNaN(div.style.left)) {
    left = 0;
  } 
  if (!isNaN(div.style.top)) {
    top = 0;
  } 
  if (event.keyCode === 37) {
    left += -10;
    div.style.left = left + 'px';  
  } else if (event.keyCode === 38) {
    top += -10;
    div.style.top = top + 'px';
  } else if (event.keyCode === 39) {
    left += +10;
    div.style.left = left + 'px';
  } else if (event.keyCode === 40) {
    top += 10;
    div.style.top = top + 'px';
  }
}

DomElement.prototype.result = function () {
  let newElementBlock;
  
  if(this.selector[0] === '.') {
    newElementBlock = document.createElement('div');
    newElementBlock.classList.add('block');
  } else if(this.selector[0] === '#') {
    newElementBlock = document.createElement('p');
    newElementBlock.setAttribute('id', 'best');
  }

  newElementBlock.style.cssText = `
    height: ${this.height}px;
    width: ${this.width}px;
    background: ${this.bg};
    font-size: ${this.fontSize}px;
    position: ${this.position};
  `;

  newElementBlock.textContent = '';
  body.append(newElementBlock);
  window.addEventListener('keydown', keyDownHandler);
};

let newObject = new DomElement('.', '100', '100', 'pink', '12', 'absolute');
newObject.result();
