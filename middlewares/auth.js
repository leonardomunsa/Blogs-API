const authService = require('../services/authService');
const { unauthorized, serverError } = require('../utils/dictionary');

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(unauthorized).json({ message: 'missing auth token' });
    }

    const user = authService.verifyToken(authorization);
    if (!user) {
      return res.status(unauthorized).json({ message: 'jwt malformed' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(serverError).json({ message: 'Internal Server Error' });
  }
};
