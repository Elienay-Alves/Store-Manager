const Joi = require('joi');
const productModel = require('../models/productModel');
const { runSchema } = require('./ultils');

const productService = {

  validateBodyCreate: runSchema(Joi.object({
    name: Joi.string().min(5).max(100).required(),
  })),

  async create(name) {
    const item = await productModel.create(name);
    return item;
  },

  async read() {
    const items = await productModel.read();
    return items;
  },

  async readId(id) {
    const item = await productModel.readId(id);
    if (!item) {
      throw new Error('Product not found');
    }

    return item;
  },

  async update(name, id) {
    await this.readId(id);
    await productModel.update(name, id);

    const result = {
      id,
      name,
    };
    return result;
  },

  async delete(id) {
    await this.readId(id);
    await productModel.delete(id);
    return true;
  },
};

module.exports = productService;
