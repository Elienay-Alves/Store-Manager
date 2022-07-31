const Joi = require('joi');
const salesModel = require('../models/salesModel');
const { runSchema } = require('./ultils');

const salesService = {

  validateBodyCreate: runSchema(Joi.object({
    productId: Joi.required(),
    quantity: Joi.number().integer().required().min(1),
  })),

  async list() {
    const items = await salesModel.list();
    return items;
  },

  async listId(id) {
    const item = await salesModel.listId(id);
    if (!item || item.length === 0) {
      throw new Error('Sale not found');
    }

    return item;
  },

  async createSaleProduct(sales) {
    const id = await salesModel.create();
    await Promise
      .all(sales.map((sale) => salesModel.createSaleProduct(id, sale)));

    const result = {
      id,
      itemsSold: sales,
    };
    return result;
  },
};

module.exports = salesService;
