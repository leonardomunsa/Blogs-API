const express = require('express');
const auth = require('../middlewares/auth');
const { Categorie } = require('../models');

const { badRequest, created, success } = require('../utils/dictionary');

const router = express.Router();

router.post('/', auth, async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) { return res.status(badRequest).json({ message: '"name" is required' }); }

    const categorie = await Categorie.create({ name });

    return res.status(created).json(categorie);
  } catch (error) {
    console.log(`POST CATEGORIES -> ${error.message}`);
    return next(error);
  }
});

router.get('/', auth, async (req, res, next) => {
  try {
    const categories = await Categorie.findAll();

    return res.status(success).json(categories);
  } catch (error) {
    console.log(`GET CATEGORIES -> ${error.message}`);
    return next(error);
  }
});

module.exports = router;
