const express = require('express');
const { User } = require('../models');

const { userSchema } = require('../middlewares/schemas');

const authService = require('../services/authService');

const auth = require('../middlewares/auth');

const {
  badRequest,
  conflict,
  created,
  success,
  notFound,
  noContent,
} = require('../utils/dictionary');

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const { displayName, email, password, image } = req.body;

    const { error } = userSchema.validate({ displayName, email, password });
    if (error) return res.status(badRequest).json({ message: error.message });

    const user = await User.findOne({ where: { email } });
    if (user) return res.status(conflict).json({ message: 'User already registered' });

    await User.create({ displayName, email, password, image });

    const token = authService.generateToken({ displayName, email });

    return res.status(created).json({ token });
  } catch (error) {
    console.log(`POST USERS -> ${error.message}`);
    return next(error);
  }
});

router.get('/', auth, async (req, res, next) => {
  try {
    const users = await User.findAll();

    return res.status(success).json(users);
  } catch (error) {
    console.log(`GET USERS -> ${error.message}`);
    return next(error);
  }
});

router.get('/:id', auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const user = await User.findOne({ where: { id } });
    if (!user) return res.status(notFound).json({ message: 'User does not exist' });

    return res.status(success).json(user);
  } catch (error) {
    console.log(`GET USERS -> ${error.message}`);
    return next(error);
  }
});

router.delete('/me', auth, async (req, res, next) => {
  try {
    const { email } = req.user;
    await User.destroy({ where: { email } });
    
    return res.status(noContent).json();
  } catch (error) {
    console.log(`DELETE ME -> ${error.message}`);
    return next(error);
  }
});

module.exports = router;
