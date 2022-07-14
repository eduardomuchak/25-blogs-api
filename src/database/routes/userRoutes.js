const { Router } = require('express');
const userController = require('../controllers/userController');

const loginRoutes = Router();

loginRoutes.post('/', userController.create);

module.exports = loginRoutes;