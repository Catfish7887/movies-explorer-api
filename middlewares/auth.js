const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const regEx = /^Bearer*\s*/i;

module.exports.auth = (req, res, next) => {
  const { authorization = '' } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    next(new UnauthorizedError('Требуется авторизация'));
    return;
  }

  const token = authorization.replace(regEx, '');

  let payload;

  try {
    payload = jwt.verify(token, process.env.NODE_ENV === 'production' ? process.env.JWT_SALT : 'dev');
    req.user = payload;
    next();
  } catch (err) {
    next(new UnauthorizedError('Требуется авторизация'));
  }
};
