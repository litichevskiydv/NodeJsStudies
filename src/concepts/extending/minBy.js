const Manipula = require("manipula");

const defaultComparer = (firstValue, secondValue) => {
  if (firstValue < secondValue) return -1;
  if (firstValue > secondValue) return 1;
  return 0;
};

Manipula.prototype.minBy = function(keySelector, comparer) {
  const iterator = this[Symbol.iterator]();
  let currentState = iterator.next();
  if (currentState.done === true) throw new Error("Source contains no elements");

  let result = currentState.value;
  let resultSelectorValue = keySelector(result);
  const valuesComparer = comparer || defaultComparer;
  for (currentState = iterator.next(); currentState.done === false; currentState = iterator.next()) {
    const selectorValue = keySelector(currentState.value);
    if (valuesComparer(selectorValue, resultSelectorValue) < 0) {
      result = currentState.value;
      resultSelectorValue = selectorValue;
    }
  }

  return result;
};
