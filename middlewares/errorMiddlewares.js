const errorMiddleware = (error, _req, res, _next) => {
  const { message } = error;

  if (message.includes('length')) return res.status(422).json({ message });

  if (message.includes('greater')) return res.status(422).json({ message });

  if (message.includes('required')) return res.status(400).json({ message });

  if (message.includes('found')) return res.status(404).json({ message });

  return res.status(500).json({ message: 'Error not handled' });
};

module.exports = errorMiddleware;
