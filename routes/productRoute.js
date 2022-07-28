const { Router } = require('express');
const productController = require('../controllers/productController');

const product = Router();

product.get('/:id', productController.listId);
product.get('/', productController.list);
product.post('/', productController.create);

module.exports = product;
