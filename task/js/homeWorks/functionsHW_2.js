'use strict';
/**
 * validate title function
 * @author Mariia Podhorna
 * @param {string} title - operand.
 * @return {string} 'return string by using rules'
 */
function validateTitle(title) {
  const allowedChars = [
    ' ', '!', ':', '-', '?', '.', ',',
    'q', 'w', 'e', 'r', 't', 'y', 'u',
    'i', 'o', 'p', 'a', 's', 'd', 'f',
    'g', 'h', 'j', 'k', 'l', 'z', 'x',
    'c', 'v', 'b', 'n', 'm',
  ];
  try {
    if (typeof title !== 'string') {
      throw new Error('Incorrect input data');
    }
    if (title.length > 2 &&
            title.length < 20 &&
            title[0]===title[0].toUpperCase() &&
            title[0].toUpperCase()!==title[0].toLowerCase()) {
      const isContainAllowerChars = title.toLowerCase()
          .split('')
          .every((char) => {
            return allowedChars.includes(char);
          });
      if (isContainAllowerChars) {
        return 'VALID';
      }
      throw new Error('INVALID');
    }
  } catch (error) {
    return error.message;
  }
}
console.log(validateTitle('Dd? - . ,,.! d'));
// =============================================== //
const sum = (value1, value2) => {
  return [value1, value2].reduce((accum, el) => {
    (Number.isFinite(el) && el % 15 === 0) ? (accum -= el) : (accum += +el);
    return accum;
  }, 0);
};
console.log(sum('25', 15));
// =============================================== //
const isPrime = (number) => {
  if (number <= 1) {
    return {isPrime: false, number};
  } else {
    for (let div = 2; div < number; div++) {
      if (number % div === 0) {
        return {isPrime: false, number};
      }
    }
    return {isPrime: true, number};
  }
};
const isEven = ({isPrime, number}) => {
  return (number % 2 === 0) ? {isPrime, isEven: true, number}:
  {isPrime, isEven: false, number};
};
const isMultipleOfTen = ({isPrime, isEven, number}) => {
  return (number % 10 === 0) ? [isPrime, isEven, true]:
  [isPrime, isEven, false];
};

const createComposition =
  (...funcs) =>
    (initial) =>
      funcs.reduceRight((sum, curFunc) => curFunc(sum), initial);

const checkNumber = createComposition(isMultipleOfTen, isEven, isPrime);

console.log(checkNumber(13));
