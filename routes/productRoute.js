const { Router } = require('express');
const productController = require('../controllers/productController');

const product = Router();

product.get('/:id', productController.readId);
product.get('/', productController.read);
product.put('/:id', productController.update);
product.delete('/:id', productController.delete)
product.post('/', productController.create);

module.exports = product;
