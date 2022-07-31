const salesService = require('../services/salesService');
const productService = require('../services/productService');

const salesController = {
  /** @type {import('express').RequestHandler} */

  async create(req, res, next) {
    try {
      const value = req.body;
      const data = await Promise
        .all(value.map((item) => salesService.validateBodyCreate(item)));

      await Promise
        .all(value.map((item) => productService.readId(item.productId)));

      const result = await salesService.createSaleProduct(data);

      return res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  },

  async read(_req, res) {
    const items = await salesService.read();
    return res.status(200).json(items);
  },

  async readId(req, res, next) {
    try {
      const { id } = req.params;
      const item = await salesService.readId(id);
      return res.status(200).json(item);
    } catch (err) {
      next(err);
    }
  },

};

module.exports = salesController;
