const Card = require('../models/card');
const { NotFoundError } = require('../errors/errors');

module.exports.getCards = (req, res, next) => {
  Card
    .find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card
    .create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card
    .findOneAndRemove({ _id: cardId, owner: userId })
    .orFail(() => {
      throw new NotFoundError(`Не удалось удалить карточку с id ${cardId}!`);
    })
    .then((card) => res.send({ message: 'Успешно удалена карточка:', data: card }))
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
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
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
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
    .catch(next);
};
