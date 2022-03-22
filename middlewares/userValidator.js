const { celebrate, Joi } = require('celebrate');

const userCreationValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(4),
  }),
});

const userUpdateValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  })
});

const avatarUpdateValidator = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().uri(),
  })
});

module.exports = {
  userCreationValidator,
  userUpdateValidator,
  avatarUpdateValidator,
};