const errorMiddleware = (err, _req, res, _next) => {
  const { message, status } = err;
  return res.status(status).json({ message });
};

module.exports = errorMiddleware;