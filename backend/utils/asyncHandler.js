const mongoose = require('mongoose');
const Conflict = require('./errors/conflict');
const BadRequest = require('./errors/badRequest');

// eslint-disable-next-line consistent-return
const asyncHandler = (controller) => async (req, res, next) => {
  try {
    await controller(req, res);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return next(new BadRequest('Переданы некорректные данные'));
    }
    if (error instanceof mongoose.Error.CastError) {
      next(new BadRequest('Передан некорректный идентификатор'));
    }
    if (error.code === 11000) {
      return next(new Conflict('Пользователь уже существует'));
    }
    next(error);
  }
};

module.exports = asyncHandler;
