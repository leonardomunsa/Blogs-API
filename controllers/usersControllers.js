const express = require('express');
const { User } = require('../models');

const authService = require('../services/authService');

const userSchema = require('../middlewares/userSchema');

const errorHandling = require('../utils/errorHandling');

const { badRequest, conflict, created } = require('../utils/dictionary');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
  
    const { error } = userSchema.validate({ displayName, email, password });
    if (error) throw errorHandling(badRequest, error.message);
  
    const user = await User.findOne({ where: { email } });
    if (user) throw errorHandling(conflict, 'User already registered');

    await User.create({ displayName, email, password, image });

    const token = authService.generateToken({ displayName, email });

    return res.status(created).json({ token });
  } catch (error) {
    console.log(`POST USERS -> ${error.message}`);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
