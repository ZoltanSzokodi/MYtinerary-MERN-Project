const appError = (message, status) => {
  const error = new Error();
  error.message = message;
  error.status = status;
  throw error;
};

module.exports = appError;