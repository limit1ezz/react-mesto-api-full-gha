const bcrypt = require('bcryptjs');
const User = require('../models/User');
const NotFound = require('../utils/errors/notFound');
const Unauthorized = require('../utils/errors/unauthorized');

module.exports.createUser = async (validatedUser) => {
  const hashedPassword = await bcrypt.hash(validatedUser.password, 12);

  const user = await User.create({
    ...validatedUser,
    password: hashedPassword,
  });
  return user;
};

module.exports.getUsers = async () => {
  const users = await User.find({});
  return users;
};

module.exports.getUser = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new NotFound('Пользователь не найден');
  } else {
    return user;
  }
};

module.exports.updateUser = async (userId, infoToUpdate) => {
  const user = await User.findByIdAndUpdate(userId, infoToUpdate, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    throw new NotFound('Пользователь не найден');
  } else {
    return user;
  }
};

module.exports.checkUser = async ({ email, password }) => {
  const existingUser = await User.findOne({ email }).select('+password');
  if (!existingUser) {
    throw new Unauthorized('Неверная почта или пароль');
  }

  const isPasswordEqual = await bcrypt.compare(password, existingUser.password);

  if (!isPasswordEqual) {
    throw new Unauthorized('Неверная почта или пароль');
  }

  return existingUser;
};
