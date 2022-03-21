const errorHandler = (err, req, res) => {
  const {
    statusCode = 500,
    message = 'Ошибка по умолчанию',
  } = err;

  res
    .status(statusCode)
    .send({
      message,
      err,
    });
};

module.exports = errorHandler;
