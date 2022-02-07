const express = require('express');
const { BlogPosts, Categorie, User } = require('../models');

const { postSchema } = require('../middlewares/schemas');

const auth = require('../middlewares/auth');

const {
  badRequest,
  created,
} = require('../utils/dictionary');

const router = express.Router();

router.post('/', auth, async (req, res, next) => {
  try {
    const { title, categoryIds, content } = req.body;
    
    const { error } = postSchema.validate({ title, categoryIds, content });
    if (error) return res.status(badRequest).json({ message: error.message });

    await categoryIds.forEach(async (id) => {
      const categorie = await Categorie.findOne({ where: { id } });
      if (!categorie) return res.status(badRequest).json({ message: '"categoryIds" not found' });
    });

    const { email } = req.user;
    const { id } = await User.findOne({ where: { email } });

    const post = await BlogPosts.create({ title, content, userId: id });

    return res.status(created).json({ title, content, userId: id, id: post.id });
  } catch (error) {
    console.log(`POST POSTS -> ${error.message}`);
    return next(error);
  }
});

module.exports = router;
