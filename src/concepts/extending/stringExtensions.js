/**
 * @param {string} value
 * @returns {boolean}
 */
String.isEmpty = function(value) {
  return (value || "").length === 0;
};
