const { Router } = require('express');
const productController = require('../controllers/productController');

const product = Router();

product.get('/search', productController.search);
product.get('/', productController.read);
product.get('/:id', productController.readId);
product.put('/:id', productController.update);
product.delete('/:id', productController.delete);
product.post('/', productController.create);

module.exports = product;
