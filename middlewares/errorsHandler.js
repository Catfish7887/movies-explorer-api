const { constants } = require('http2');

module.exports.errorsHandler = (err, req, res, next) => {
  res.status(err.statusCode ? err.statusCode : constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send(err.message ? { message: err.message } : 'Произошла неизвестная ошибка');
  next();
};
