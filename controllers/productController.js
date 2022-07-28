const productService = require('../services/productService');

const productController = {
  /** @type {import('express').RequestHandler} */

  async list(_req, res) {
    const items = await productService.list();
    return res.status(200).json(items);
  },

  async listId(req, res) {
    try {
      const { id } = req.params;
      const item = await productService.listId(id);
      return res.status(200).json(item);
    } catch (err) {
      return res.status(404).json({ message: err.message });
    }
  },
};

module.exports = productController;
