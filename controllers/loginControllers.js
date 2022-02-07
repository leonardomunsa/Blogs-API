const express = require('express');
const { User } = require('../models');

const { loginSchema } = require('../middlewares/schemas');

const authService = require('../services/authService');

const { badRequest, success } = require('../utils/dictionary');

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { error } = loginSchema.validate({ email, password });
    if (error) return res.status(badRequest).json({ message: error.message });

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(badRequest).json({ message: 'Invalid fields' });

    const token = authService.generateToken({ email });

    return res.status(success).json({ token });
  } catch (error) {
    console.log(`POST LOGIN -> ${error.message}`);
    return next(error);
  }
});

module.exports = router;
