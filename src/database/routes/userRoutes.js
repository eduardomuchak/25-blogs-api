const { Router } = require('express');
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');

const loginRoutes = Router();

loginRoutes.post('/', userController.create);
loginRoutes.get('/', auth, userController.list);
loginRoutes.get('/:id', auth, userController.getById);

module.exports = loginRoutes;