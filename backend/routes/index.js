const express = require('express');

const userRoutes = require('./userRoutes');
const cardRoutes = require('./cardRoutes');
const homeRoutes = require('./homeRoutes');
const auth = require('../middlewares/auth');
const NotFound = require('../utils/errors/notFound');

const router = express.Router();

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.use('/', homeRoutes);
router.use('/users', auth, userRoutes);
router.use('/cards', auth, cardRoutes);

router.all('*', auth, (req, res, next) => next(new NotFound('Страница не найдена')));

module.exports = router;
