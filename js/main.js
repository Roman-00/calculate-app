'use strict';

const body = document.querySelector('body');

const DomElement = function (selector, height, width, bg, fontSize) {
  this.selector = selector;
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;
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
  `;

  newElementBlock.textContent = 'Hello World';
  body.append(newElementBlock);
};

let newObject = new DomElement('#');
newObject.result();
