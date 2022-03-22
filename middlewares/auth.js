const jwt = require('jsonwebtoken');
const { handleAuthError } = require('../errors/errors');
const TokenCheckError = require('../errors/TokenCheckError');

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
  } catch (e) {
    const err = new TokenCheckError('Некорректный токен');
    next(err);
  }

  req.user = payload;

  return next();
};
