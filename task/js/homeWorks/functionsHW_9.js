'use strict';

const calculateFibByRecursion = (sequenceLength) => {
  return sequenceLength <= 1 ?
    sequenceLength :
    calculateFibByRecursion(sequenceLength - 1) +
        calculateFibByRecursion(sequenceLength - 2);
};

const startRecursion = performance.now();
console.log(calculateFibByRecursion(20));
const finishRecursion = (performance.now() - startRecursion).toFixed(4);
console.log('Call to calculateFibByRecursion took '+ finishRecursion + ' ms');

const calculateFibByCycle = (sequenceLength) => {
  let n1 = 0;
  let n2 = 1;
  let nextTerm;

  for (let i = 1; i <= sequenceLength; i++) {
    nextTerm = n1 + n2;
    n1 = n2;
    n2 = nextTerm;
  }
  return n1;
};
const startCycle = performance.now();
console.log(calculateFibByCycle(100));
const finishCycle = (performance.now() - startCycle).toFixed(4);
console.log('Call to calculateFibByCycle took '+ finishCycle + ' ms');

// функция calculateFibByRecursion работает медленнее, чем
// функция calculateFibByCycle
// так как при каждом новом рекурсивном вызове функции создается
// новый объект лексического окружения
// и продолжает храниться в памяти, так как ссылка на этот объект
// сохранется в Call Stack - сборщик мусора не может удалить его
// в цикле такой проблемы не возникает, во время его работы переменные
// перезаписываются новыми данными и необходимости
// выделять дополнительную память не возникает

function parseJSON(json) {
  try {
    return JSON.parse(json);
  } catch (e) {
    return null;
  }
}

console.log(parseJSON('{"role":"student", "company":"EPAM", "mentor":"Cool Mentor"}'));
console.log(parseJSON('{role:student, company:"EPAM", "mentor":"CoolMentor"}'));

function anotherParseJSON(json) {
  try {
    const data = JSON.parse(json);

    if (data.hasOwnProperty('name') && data.hasOwnProperty('company')) {
      return data;
    }
    throw new TypeError();
  } catch (error) {
    if (error.name === 'TypeError') {
      throw new TypeError('required property does not exist');
    }
    throw new SyntaxError('some other error happens');
  }
}

window.onerror = function errorHandler(errorMsg, url, lineNumber) {
  console.log(errorMsg + ' in ' + url + ' on line ' + lineNumber);
  return true;
};

anotherParseJSON('{"name":"student", "company":"EPAM", "mentor":"CoolMentor"}');
anotherParseJSON('{role:student, company:"EPAM", "mentor":"Cool Mentor"}');
