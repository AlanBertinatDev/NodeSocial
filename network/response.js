export const success = function (req, res, message, status) {
  let statusCode = status || 200;
  let statusMessage = message || '';

  res.status(statusCode).send({
      error: false,
      status,
      body: statusMessage,
  });
}

export const error = (req, res, message = 'Internal Server Error', status = 500) => {
  let statusCode = status || 500;
  let statusMessage = message || 'Internal server error';

  res.status(statusCode).send({
      error: true,
      status,
      body: statusMessage,
  });
}

export default {
  success,
  error,
};