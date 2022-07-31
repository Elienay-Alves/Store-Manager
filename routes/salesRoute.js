const { Router } = require('express');
const salesController = require('../controllers/salesController');

const sales = Router();

sales.get('/:id', salesController.listId);
sales.get('/', salesController.list);
sales.post('/', salesController.create);

module.exports = sales;
