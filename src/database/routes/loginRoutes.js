const { Router } = require('express');
const loginController = require('../controllers/loginController');

const loginRoutes = Router();

loginRoutes.post('/', loginController.login);

module.exports = loginRoutes;