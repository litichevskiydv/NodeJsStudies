module.exports = class CustomError extends Error {
  /**
   * @param {string} message
   * @param {Error} innerError
   */
  constructor(message, innerError) {
    super(`${message}\n---========---\nInner error ${innerError.name}:\n${innerError.message}\n${innerError.stack}\n---========---`);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    this.innerError = innerError;
  }
};
