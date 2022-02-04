const express = require('express');
const { Users } = require('../models');

const userSchema = require('../middlewares/userSchema');

const authService = require('../services/authService');

const { badRequest, conflict, created } = require('../utils/dictionary');

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const { displayName, email, password, image } = req.body;
  
    const { error } = userSchema.validate({ displayName, email, password });
    if (error) return res.status(badRequest).json({ message: error.message });
  
    const user = await Users.findOne({ where: { email } });
    if (user) return res.status(conflict).json({ message: 'User already registered' });

    await Users.create({ displayName, email, password, image });

    const token = authService.generateToken({ displayName, email });

    return res.status(created).json({ token });
  } catch (error) {
    console.log(`POST USERS -> ${error.message}`);
    return next(error);
  }
});

module.exports = router;