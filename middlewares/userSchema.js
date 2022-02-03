const Joi = require('joi');

module.exports = Joi.object({
  displayName: Joi.string().min(8).required().messages({
    'string.min': '"displayName" length must be at least 8 characters long',
  }),
  email: Joi.string().required().regex(/^[\w-\\.]+@([\w-])+[\w-\\.]{2,4}$/g).messages({
    'object.regex': '"email" must bee a valid email',
  }),
  password: Joi.string().min(6).required().message({
    'string.min': '"password" length must be 6 characters long',
  }),
});
