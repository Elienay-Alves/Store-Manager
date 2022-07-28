const Joi = require('joi');
const productModel = require('../models/productModel');


const productService = {

  async validateBodyCreate(value) {
    const schema = Joi.object({
      name: Joi.string().min(5).max(100).required(),
    });

    const result = await schema.validateAsync(value);
    return result;
  },

  async list() {
    const items = await productModel.list();
    return items;
  },

  async listId(id) {
    const item = await productModel.listId(id);
    if (!item) {
      throw new Error('Product not found');
    }

    return item;
  },

  async create(name) {
    const item = await productModel.create(name);
    return item;
  },
};

module.exports = productService;
