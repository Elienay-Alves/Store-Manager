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
        .all(value.map((item) => productService.listId(item.productId)));

      const result = await salesService.createSaleProduct(data);

      return res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = salesController;
