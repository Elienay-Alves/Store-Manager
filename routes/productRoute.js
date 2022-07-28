const { Router } = require('express');
const productController = require('../controllers/productController');

const product = Router();

product.get('/', productController.list);
product.get('/:id', productController.listId);
product.post('/', productController.create);

module.exports = product;
