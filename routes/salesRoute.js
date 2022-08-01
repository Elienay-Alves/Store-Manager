const { Router } = require('express');
const salesController = require('../controllers/salesController');

const sales = Router();

sales.get('/:id', salesController.readId);
sales.delete('/:id', salesController.delete);
sales.put('/:id', salesController.update);
sales.get('/', salesController.read);
sales.post('/', salesController.create);

module.exports = sales;
