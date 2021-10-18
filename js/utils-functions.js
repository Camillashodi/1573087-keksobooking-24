function getRandomInteger (startOfRange, endOfRange) {
  if (!(typeof startOfRange === 'number') || !(typeof endOfRange === 'number')) {
    return null;
  }
  if (startOfRange < 0) {
    return null;
  }
  if (endOfRange < 0) {
    return null;
  }
  if ((endOfRange - startOfRange) < 0) {
    return null;
  }
  if ((Math.floor(endOfRange) - Math.floor(startOfRange)) === 0 && !Number.isInteger(startOfRange)) {
    return null;
  }
  startOfRange = Math.ceil(startOfRange);
  endOfRange = Math.floor(endOfRange);
  return Math.floor(Math.random()*(endOfRange - startOfRange + 1) + startOfRange);
}

function getRandomFloat (startOfRange, endOfRange, scale) {
  if (!(typeof startOfRange === 'number') || !(typeof endOfRange === 'number') || !Number.isInteger(scale)) {
    return null;
  }
  if (startOfRange < 0) {
    return null;
  }
  if (endOfRange < 0) {
    return null;
  }
  if ((endOfRange - startOfRange) < 0) {
    return null;
  }
  return (+Number(Math.random()*(endOfRange - startOfRange) + startOfRange).toFixed(scale));
}

function getValuesFromArray (array) {
  const copyArray = array.slice();
  const selectedArray = [];
  const quantityOfValues = getRandomInteger(1, copyArray.length);
  for (let i = 0; i < quantityOfValues; i++) {
    const randomInteger = getRandomInteger(0, copyArray.length - 1);
    selectedArray[i] = copyArray[randomInteger];
    copyArray.splice(randomInteger, 1);
  }
  copyArray.length = 0;
  return selectedArray;
}

export { getRandomInteger, getRandomFloat, getValuesFromArray };
