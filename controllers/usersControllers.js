const express = require('express');
const { Users } = require('../models');

const userSchema = require('../middlewares/userSchema');

const authService = require('../services/authService');

const errorHandling = require('../utils/errorHandling');

const { badRequest, conflict, created } = require('../utils/dictionary');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
  
    const { error } = userSchema.validate({ displayName, email, password });
    if (error) throw errorHandling(badRequest, error.message);
  
    const user = await Users.findOne({ where: { email } });
    if (user) throw errorHandling(conflict, 'User already registered');

    await Users.create({ displayName, email, password, image });

    const token = authService.generateToken({ displayName, email });

    return res.status(created).json({ token });
  } catch (error) {
    console.log(`POST USERS -> ${error.message}`);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;