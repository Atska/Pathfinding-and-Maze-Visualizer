class Set {
  constructor() {
    this.values = [];
  }

  get() {
    return this.values;
  }

  isEmpty() {
    if (this.values.length === 0) return true;
    return false;
  }

  add(value) {
    if (this.isEmpty()) return this.values.push(value);
    if (!checkIfDublicate(value, this.values)) return this.values.push(value);
  }

  has(value) {
    return checkIfDublicate(value, this.values);
  }
}

export default Set;

/**
 * Compares two array with two values [val1, val2] and checks if their values are the same
 * @param {Array} arr1 Array with two values -> [3, 3]
 * @param {Array} arr2 Array with two values -> [3, 3]
 * @returns Boolean; If array values are same -> true else -> false
 */
const equalityChecker = (arr1, arr2) => {
  if (arr1[0] === arr2[0] && arr1[1] === arr2[1]) return true;
  return false;
};

/**
 * Checks if there is a dublicate value in an array
 * @param {Array} value single array [val1, val2]
 * @param {Array} array values in the set
 */
const checkIfDublicate = (value, array) => {
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    if (equalityChecker(element, value)) return true;
  }
  return false;
};
