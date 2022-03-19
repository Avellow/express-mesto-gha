const jwt = require('jsonwebtoken');
const { handleAuthError } = require('../errors/errors');

const extractBearerHeader = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    return handleAuthError(res);
  }

  const token = extractBearerHeader(authorization);
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret');
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload;

  return next();
};
