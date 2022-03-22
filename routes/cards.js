const router = require('express').Router();
const cardValidator = require('../middlewares/cardValidator');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/card');

router.get('/', getCards);
router.post('/', cardValidator, createCard);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
