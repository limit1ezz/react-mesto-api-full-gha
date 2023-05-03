const express = require('express');

const asyncHandler = require('../utils/asyncHandler');

const {
  getUsers,
  getUser,
  updateUser,
  updateAvatar,
  getMyself,
} = require('../controllers/userController');
const {
  validateUserId,
  validateUpdatedUser,
  validateUpdatedAvatar,
} = require('../schemas/userSchemas');

const router = express.Router();

router.get('/', asyncHandler(getUsers));
router.get('/me', asyncHandler(getMyself));
router.get('/:userId', validateUserId, asyncHandler(getUser));
router.patch('/me', validateUpdatedUser, asyncHandler(updateUser));
router.patch('/me/avatar', validateUpdatedAvatar, asyncHandler(updateAvatar));

module.exports = router;
