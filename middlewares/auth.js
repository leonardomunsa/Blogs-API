const authService = require('../services/authService');
const { unauthorized, serverError } = require('../utils/dictionary');

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(unauthorized).json({ message: 'Token not found' });
    }

    const user = authService.verifyToken(authorization);
    if (!user) {
      return res.status(unauthorized).json({ message: 'Expired or invalid token' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(serverError).json({ message: 'Internal Server Error' });
  }
};
