const productModel = require('../models/productModel');

const productService = {
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
};

module.exports = productService;
