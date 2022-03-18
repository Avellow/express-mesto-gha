const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { NotFoundError, checkError } = require('../errors/errors');

module.exports.getUsers = (req, res) => {
  User
    .find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => checkError(err, res));
};

module.exports.getUser = (req, res) => {
  User
    .findById(req.params.userId)
    .orFail(() => {
      throw new NotFoundError('Запрашиваемый пользователь не найден');
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => checkError(err, res));
};

module.exports.createUser = (req, res) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User
      .create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
      .then((user) => res.send({ data: user })))
    .catch((err) => checkError(err, res));
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  User
    .findByIdAndUpdate(
      req.user._id,
      { name, about },
      {
        new: true,
        runValidators: true,
        upsert: false,
      },
    )
    .orFail(() => {
      throw new NotFoundError('Не удалось обновить информацию о пользователе, т.к. он не найден в базе данных ');
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => checkError(err, res));
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User
    .findByIdAndUpdate(
      req.user._id,
      { avatar },
      {
        new: true,
        runValidators: true,
        upsert: false,
      },
    )
    .orFail(() => {
      throw new NotFoundError('Не удалось обновить аватар пользователя, т.к. он не найден в базе данных ');
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => checkError(err, res));
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User
    .findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, 'some-secret', { expiresIn: '7d' }),
      });
    })
    .catch((err) => checkError(err, res));
};
