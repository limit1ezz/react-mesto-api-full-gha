const express = require('express');
const asyncHandler = require('../utils/asyncHandler');

const { login, createUser } = require('../controllers/userController');
const { validateSignup, validateSignin } = require('../schemas/userSchemas');

const router = express.Router();

router.post('/signin', validateSignin, asyncHandler(login));
router.post('/signup', validateSignup, asyncHandler(createUser));

module.exports = router;
