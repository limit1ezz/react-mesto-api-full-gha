const cardService = require('../services/cardService');
const { statusCodes } = require('../utils/constants');

module.exports.createCard = async (req, res) => {
  const card = await cardService.createCard({
    ...req.body,
    owner: req.user._id,
  });
  res
    .status(statusCodes.CREATED)
    .json({ message: 'Карточка успешно создана', card });
};

module.exports.getCards = async (req, res) => {
  const cards = await cardService.getCards();
  res.json(cards);
};

module.exports.deleteCard = async (req, res) => {
  const card = await cardService.deleteCard(req.params.cardId, req.user._id);
  res.json({ message: 'Карточка успешно удалена', card });
};

module.exports.likeCard = async (req, res) => {
  const card = await cardService.likeCard(req.params.cardId, req.user._id);
  res.json({ message: 'Лайк поставлен', card });
};

module.exports.dislikeCard = async (req, res) => {
  const card = await cardService.dislikeCard(req.params.cardId, req.user._id);
  res.json({ message: 'Лайк удален', card });
};
