const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { regexp, messages } = require('../utils/constants');

module.exports.validateSignup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom((value, helpers) => {
      const options = {
        protocols: ['http', 'https'],
        require_protocol: true,
      };
      if (validator.isURL(value, options)) {
        return value;
      }
      return helpers.message({
        custom: messages.NOT_VALID_URL,
      });
    }),
    email: Joi.string()
      .custom((value, helpers) => {
        if (validator.isEmail(value)) {
          return value;
        }
        return helpers.message({
          custom: messages.NOT_VALID_EMAIL,
        });
      })
      .required(),
    password: Joi.string().required(),
  }),
});

module.exports.validateUpdatedUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

module.exports.validateUpdatedAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string()
      .custom((value, helpers) => {
        const options = {
          protocols: ['http', 'https'],
          require_protocol: true,
        };
        if (validator.isURL(value, options)) {
          return value;
        }
        return helpers.message({
          custom: messages.NOT_VALID_URL,
        });
      })
      .required(),
  }),
});

module.exports.validateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().pattern(new RegExp(regexp.ID)).required(),
  }),
});

module.exports.validateSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .custom((value, helpers) => {
        if (validator.isEmail(value)) {
          return value;
        }
        return helpers.message({
          custom: messages.NOT_VALID_EMAIL,
        });
      })
      .required(),
    password: Joi.string().required(),
  }),
});
