'use strict';

const cache = (func) => {
  const cache = {};
  console.log('[cache]', cache);
  return function() {
    const key = JSON.stringify(arguments); //eslint-disable-line
    const comp = cache.hasOwnProperty(key);

    if (comp) {
      return cache[key];
    } else {
      cache[key] = func.apply(null, arguments); //eslint-disable-line
      return cache[key];
    }
  };
};
const complexFunction = function(arg1, arg2) {
  return arg1 + arg2;
};

const cachedFunction = cache(complexFunction);

console.log(cachedFunction('foo', 'bar'));
console.log(cachedFunction('foo', 'bar'));

//  ============================================================= //

const ladder = {
  step: 0,
  up() {
    this.step++;
    return this;
  },
  down() {
    this.step--;
    return this;
  },
  showStep() {
    console.log(this.step);
  },
};

ladder.up().up().down().up().showStep();

//  ============================================================= //

const applyAll = (func, ...args) => {
  return func(...args);
};

const anotherApplyAll = function() {
  const args = [].slice.call(arguments); //eslint-disable-line
  const func = args.shift();
  return func.apply(null, args); //eslint-disable-line
};

const sum = function(a, b, c) {
  return a + b + c;
};

console.log('1', applyAll(sum, 1, 2, 3));
console.log('2', anotherApplyAll(sum, 1, 2, 3));

//  ============================================================= //
const zero = function(expression) {
  return createDigit(0, expression);
};
const one = function(expression) {
  return createDigit(1, expression);
};
const two = function(expression) {
  return createDigit(2, expression);
};
const three = function(expression) {
  return createDigit(3, expression);
};
const four = function(expression) {
  return createDigit(4, expression);
};
const five = function(expression) {
  return createDigit(5, expression);
};
const six = function(expression) {
  return createDigit(6, expression);
};
const seven = function(expression) {
  return createDigit(7, expression);
};
const eight = function(expression) {
  return createDigit(8, expression);
};
const nine = function(expression) {
  return createDigit(9, expression);
};
const createDigit = function(digit, expression) {
  const part = `${digit}${expression}`;
  if (expression) {
    return new Function('return ' + part)();
  } else {
    return digit;
  }
};
//
const plus = function(expression) {
  return `+${expression}`;
};
const minus = function(expression) {
  return `-${expression}`;
};
const multiply = function(expression) {
  return `*${expression}`;
};
const divide = function(expression) {
  return `/${expression}`;
};

console.log(seven(multiply(five()))); // 35
console.log(four(plus(nine()))); // 13
console.log(four(plus(zero()))); // 13
console.log(four(plus(nine(minus(one()))))); // 12
console.log(eight(minus(three()))); // 5
console.log(six(divide(two()))); // 3

// //////////////////////////////////
/**
 *  patchObject function
 * @author Mariia Podhorna
 * @param {object} obj  - operand.
 * @param {function} methods  - operand.
 * @return {object} 'return object by using rules'
 */
function patchObject(obj, ...methods) {
  if (!obj) {
    obj= {};
  };
  methods.forEach((method)=>{
    obj[method.name]= method;
  });
  return obj;
}

let obj = {
  name: 'Ivan',
  surname: 'Baraban',
  age: 42,
  score: 12,
};

let obj2 = {
  name: 'Petya',
  surname: 'Padawan',
  age: 52,
  score: 28,
};

const greetings = function hello(greeting) {
  return this.name ? `${greeting}, my name is ${this.name}` :  //eslint-disable-line
  `${greeting}, my name is unknown`;
};
const showSuccess = function showSuccessKoef() {
  return this.age/this.score || 0; //eslint-disable-line
};
const howOldAreYou = function myAge() {
  return this.age || 'age is unavailable'; //eslint-disable-line
};


obj = patchObject(obj, greetings, howOldAreYou, showSuccess);
obj2 = patchObject(obj2, greetings, howOldAreYou);
const obj3 = patchObject(null, greetings, howOldAreYou, showSuccess);

console.log(obj.myAge()); // 42
console.log(obj.showSuccessKoef()); // 3.5
console.log(obj.hello('yo')); // yo, my name is Ivan
console.log(obj2.myAge()); // 52
console.log(obj2.hello('Hi sir')); // Hi sir, my name is Petya
console.log(obj3.hello('Good Day')); // Good Day, my name is unknown
console.log(obj3.showSuccessKoef()); // 0
console.log(obj3.myAge()); // age is unavailabl
