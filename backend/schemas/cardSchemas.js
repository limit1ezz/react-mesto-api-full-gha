const validator = require('validator');
const { celebrate, Joi } = require('celebrate');
const { regexp, messages } = require('../utils/constants');

module.exports.validateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string()
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

module.exports.validateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().pattern(new RegExp(regexp.ID)).required(),
  }),
});
