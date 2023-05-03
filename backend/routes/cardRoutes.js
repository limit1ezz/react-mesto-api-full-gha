const express = require('express');
const asyncHandler = require('../utils/asyncHandler');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cardController');
const { validateCard, validateCardId } = require('../schemas/cardSchemas');

const router = express.Router();

router.get('/', asyncHandler(getCards));
router.post('/', validateCard, asyncHandler(createCard));
router.delete('/:cardId', validateCardId, asyncHandler(deleteCard));
router.put('/:cardId/likes', validateCardId, asyncHandler(likeCard));
router.delete('/:cardId/likes', validateCardId, asyncHandler(dislikeCard));

module.exports = router;
