const Joi = require('joi');

const userSchema = Joi.object({
  displayName: Joi.string().min(8).required().messages({
    'string.min': '"displayName" length must be at least 8 characters long',
  }),
  email: Joi.string()
    .required()
    .regex(/^[\w-\\.]+@([\w-])+[\w-\\.]{2,4}$/m)
    .messages({
      'string.pattern.base': '"email" must be a valid email',
    }),
  password: Joi.string().min(6).required().messages({
    'string.min': '"password" length must be 6 characters long',
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().required().min(1).messages({
    'string.min': '"email" is not allowed to be empty',
  }),
  password: Joi.string().min(1).required().messages({
    'string.min': '"password" is not allowed to be empty',
  }),
});

const postSchema = Joi.object({
  title: Joi.string().required(),
  categoryIds: Joi.required(),
  content: Joi.string().required(),
});

module.exports = {
  userSchema,
  loginSchema,
  postSchema,
};
