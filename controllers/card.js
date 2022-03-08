const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card
    .find({})
    .then(cards => res.send({ data: cards }))
    .catch(err => res.status(500).send({ message: err.message }));
}

module.exports.createCard = (req, res) => {
  const { name, link, user } = req.params;

  Card
    .create({ name, link, owner: user._id })
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: err.message }));
}