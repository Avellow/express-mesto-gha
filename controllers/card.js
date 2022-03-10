const Card = require('../models/card');
const { NotFoundError, checkError } = require('../errors/errors');

module.exports.getCards = (req, res) => {
  Card
    .find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => checkError(err, res));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card
    .create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => checkError(err, res));
};

module.exports.deleteCard = (req, res) => {
  Card
    .findByIdAndRemove(req.params.cardId)
    .orFail(() => {
      throw new NotFoundError(`Не удалось удалить. Карточка с id ${req.params.cardId} не найдена!`);
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => checkError(err, res));
};

module.exports.likeCard = (req, res) => {
  Card
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
      { new: true },
    )
    .orFail(() => {
      throw new NotFoundError(`Не удалось лайкнуть. Карточка с id ${req.params.cardId} не найдена в базе данных!`);
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => checkError(err, res));
};

module.exports.dislikeCard = (req, res) => {
  Card
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } }, // убрать _id из массива
      { new: true },
    )
    .orFail(() => {
      throw new NotFoundError(`Не удалость убрать лайк. Карточка с id ${req.params.cardId} не найдена в базе данных!`);
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => checkError(err, res));
};
