const salesService = require('../services/salesService');
const productService = require('../services/productService');

const salesController = {
  /** @type {import('express').RequestHandler} */

  async list(_req, res) {
    const items = await salesService.list();
    return res.status(200).json(items);
  },

  async listId(req, res, next) {
    try {
      const { id } = req.params;
      const item = await salesService.listId(id);
      return res.status(200).json(item);
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      const value = req.body;
      const data = await Promise
        .all(value.map((item) => salesService.validateBodyCreate(item)));

      await Promise
        .all(value.map((item) => productService.listId(item.productId)));

      const result = await salesService.createSaleProduct(data);

      return res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = salesController;
