const productService = require('../services/productService');

const productController = {
  /** @type {import('express').RequestHandler} */

  async create(req, res, next) {
    try {
      const { name } = await productService.validateBodyCreate(req.body);
      const item = await productService.create(name);
      return res.status(201).json(item);
    } catch (error) {
      next(error);
    }
  },

  async read(_req, res) {
    const items = await productService.read();
    return res.status(200).json(items);
  },

  async readId(req, res) {
    try {
      const { id } = req.params;
      const item = await productService.readId(id);
      return res.status(200).json(item);
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name } = await productService.validateBodyCreate(req.body);
      const result = await productService.update(name, id);
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = productController;
