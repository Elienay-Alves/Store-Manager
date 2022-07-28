const errorMiddleware = (error, _req, res, _next) => {
  const { message } = error;

  if (message.includes('required')) return res.status(400).json({ message });

  if (message.includes('length')) return res.status(422).json({ message });
};

module.exports = errorMiddleware;
