const Card = require('../models/Card');
const NotFound = require('../utils/errors/notFound');
const Forbidden = require('../utils/errors/forbidden');

module.exports.createCard = async (validatedCard) => {
  const { _id } = await Card.create(validatedCard);
  const populatedCard = await Card.findById(_id)
    .populate(['owner'])
    .lean()
    .exec();
  return populatedCard;
};

module.exports.getCards = async () => {
  const cards = await Card.find({}).populate(['owner', 'likes']).lean().exec();
  return cards;
};

module.exports.deleteCard = async (cardId, userId) => {
  const card = await Card.findById(cardId);

  if (!card) {
    throw new NotFound('Карточкa не найдена');
  }

  if (card.owner.toString() !== userId) {
    throw new Forbidden('Удаление чужих карточек запрещено');
  }

  await card.deleteOne();
  return card;
};

module.exports.likeCard = async (cardId, userId) => {
  const card = await Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .lean()
    .exec();

  if (!card) {
    throw new NotFound('Карточкa не найдена');
  }

  return card;
};

module.exports.dislikeCard = async (cardId, userId) => {
  const card = await Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .exec();

  if (!card) {
    throw new NotFound('Карточкa не найдена');
  }

  return card;
};
