function errorHandler(options) {
  const { code = "", message = "" } = options;
  const err = new Error(message);
  err.code = code;
  throw err;
}

module.exports = errorHandler;