const { Router } = require('express');
const salesController = require('../controllers/salesController');

const sales = Router();

sales.get('/:id', salesController.readId);
sales.get('/', salesController.read);
sales.post('/', salesController.create);

module.exports = sales;
