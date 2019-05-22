/**
 * @param {string} value
 * @returns {boolean}
 */
String.isEmpty = function(value) {
  return (value || "").length === 0;
};

/**
 * @returns {string}
 */
String.prototype.reverse = function() {
  return "".concat(...Array.from(this).reverse());
};
