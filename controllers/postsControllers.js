const express = require('express');
const { BlogPosts, Categorie, User } = require('../models');

const { postSchema } = require('../middlewares/schemas');

const auth = require('../middlewares/auth');

const {
  badRequest,
  created,
  success,
} = require('../utils/dictionary');

const router = express.Router();

router.post('/', auth, async (req, res, next) => {
  try {
    const { title, categoryIds, content } = req.body;
    
    const { error } = postSchema.validate({ title, categoryIds, content });
    if (error) return res.status(badRequest).json({ message: error.message });
    
    const categories = await Promise.all(categoryIds.map((id) =>
      Categorie.findOne({ where: { id } })));
    
    if (categories.includes(null)) { 
      return res.status(badRequest).json({ message: '"categoryIds" not found' });
    }
    
    const { email } = req.user;
    const { id } = await User.findOne({ where: { email } });

    const post = await BlogPosts.create({ title, content, userId: id });

    return res.status(created).json({ id: post.id, title, content, userId: id });
  } catch (error) {
    console.log(`POST POSTS -> ${error.message}`);
    return next(error);
  }
});

router.get('/', auth, async (req, res, next) => {
  try {
    const posts = await BlogPosts.findAll({
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Categorie, as: 'categories', through: { attributes: [] } },
      ],
    });

    return res.status(success).json(posts);
  } catch (error) {
    console.log(`GET POSTS -> ${error.message}`);
    return next(error);
  }
});

module.exports = router;
