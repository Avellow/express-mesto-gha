const router = require('express').Router();

const { getCards, createCard } = require('../controllers/card');

router.get('/', getCards);
router.post('/', createCard);

module.exports = router;