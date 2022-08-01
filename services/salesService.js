const Joi = require('joi');
const salesModel = require('../models/salesModel');
const { runSchema } = require('./ultils');

const salesService = {

  validateBodyCreate: runSchema(Joi.object({
    productId: Joi.required(),
    quantity: Joi.number().integer().required().min(1),
  })),

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

  async read() {
    const items = await salesModel.read();
    return items;
  },

  async readId(id) {
    const item = await salesModel.readId(id);
    if (!item || item.length === 0) {
      throw new Error('Sale not found');
    }

    return item;
  },

  async update(sales, id) {
    await this.readId(id);

    if (sales.length > 1) {
      await Promise
        .all(sales.map((sale) => salesModel.update(sale, id)));
    } else {
      await salesService.update(sales, id);
    }

    const result = {
      saleId: id,
      itemsUpdated: sales,
    };
    return result;
  },

  async delete(id) {
    await this.readId(id);
    await salesModel.delete(id);
    return true;
  },
};

module.exports = salesService;
