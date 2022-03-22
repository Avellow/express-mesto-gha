const { celebrate, Joi } = require('celebrate');

const cardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().uri().required(),
  })
});

module.exports = cardValidator;