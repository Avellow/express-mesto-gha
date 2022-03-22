const errorHandler = (err, req, res, next) => {
  let {
    statusCode = 500,
    message,
  } = err;

  if (statusCode === 500) {
    message = 'Ошибка по умолчанию';
  }
  if (err.code === 11000) {
    statusCode = 409;
    message = 'Пользователь с таким email уже существует.';
  }

  res
    .status(statusCode)
    .send({
      message: `${statusCode} ${message}`,
      err,
    });

  return next();
};

module.exports = errorHandler;
