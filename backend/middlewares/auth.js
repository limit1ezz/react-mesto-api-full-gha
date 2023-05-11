const tokenService = require('../services/tokenService');
const Unauthorized = require('../utils/errors/unauthorized');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new Unauthorized('Необходима авторизация'));
  }

  const accessToken = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = tokenService.verify(accessToken);
  } catch (err) {
    return next(new Unauthorized('Необходима авторизация'));
  }

  req.user = payload;

  return next();
};
