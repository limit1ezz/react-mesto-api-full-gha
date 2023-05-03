const jwt = require('jsonwebtoken');
const config = require('config');

require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.generate = (payload) => {
  const accessToken = jwt.sign(
    payload,
    NODE_ENV === 'production' ? JWT_SECRET : config.get('jwtSecret'),
    {
      expiresIn: '7d',
    },
  );

  return accessToken;
};

module.exports.verify = (accessToken) => {
  const verifiedToken = jwt.verify(
    accessToken,
    NODE_ENV === 'production' ? JWT_SECRET : config.get('jwtSecret'),
  );
  return verifiedToken;
};
