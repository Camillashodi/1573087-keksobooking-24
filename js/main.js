function getRandomInteger (startOfRange, endOfRange) {
  if (!(typeof startOfRange === 'number') || !(typeof endOfRange === 'number')) {
    //console.log('Argument is not a number'); //я не знаю как сделать вывод ошибки, eslint ругается на console.log
    return null;
  }
  if (startOfRange < 0) {
    //console.log('It is not a properly value for range to start');
    return null;
  }
  if (endOfRange < 0) {
    //console.log('It is not a properly value for range to end');
    return null;
  }
  if ((endOfRange - startOfRange) < 0) {
    //console.log('Range start is greater than range end');
    return null;
  }
  if ((Math.floor(endOfRange) - Math.floor(startOfRange)) === 0 && !Number.isInteger(startOfRange)) {
    //console.log('There is no integer in this range');
    return null;
  }
  startOfRange = Math.ceil(startOfRange);
  endOfRange = Math.floor(endOfRange);
  return Math.floor(Math.random()*(endOfRange - startOfRange + 1) + startOfRange);
  //источник: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
}

function getRandomNumber (startOfRange, endOfRange, scale) {
  if (!(typeof startOfRange === 'number') || !(typeof endOfRange === 'number') || !Number.isInteger(scale)) {
    //return 'Argument is not valid';
    //console.log('Argument is not valid');
    return null;
  }
  if (startOfRange < 0) {
    //console.log('It is not a properly value for range to start');
    return null;
  }
  if (endOfRange < 0) {
    //console.log('It is not a properly value for range to end');
    return null;
  }
  if ((endOfRange - startOfRange) < 0) {
    //console.log('Range start is greater than range end');
    return null;
  }
  return Number(Math.random()*(endOfRange - startOfRange) + startOfRange).toFixed(scale);
}

getRandomInteger(1, 3);
getRandomNumber(1, 2, 3);
