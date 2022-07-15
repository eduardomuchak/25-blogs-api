const { Router } = require('express');
const categoryController = require('../controllers/categoryController');
const auth = require('../middlewares/auth');

const categoryRoutes = Router();

categoryRoutes.post('/', auth, categoryController.create);
categoryRoutes.get('/', auth, categoryController.list);
categoryRoutes.get('/:id', auth, categoryController.getById);

module.exports = categoryRoutes;