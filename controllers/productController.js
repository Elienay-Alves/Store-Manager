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
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  },

  async create(req, res, next) {
    try {
      const { name } = await productService.validateBodyCreate(req.body);
      const item = await productService.create(name);
      return res.status(201).json(item);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = productController;
