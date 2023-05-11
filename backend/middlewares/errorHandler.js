const { statusCodes } = require('../utils/constants');

const errorHandler = (error, req, res, next) => {
  const { statusCode = statusCodes.SERVER_ERROR, message } = error;
  res.status(statusCode).send({
    message:
      statusCode === statusCodes.SERVER_ERROR
        ? 'На сервере произошла ошибка'
        : message,
  });
  next();
};

module.exports = errorHandler;
