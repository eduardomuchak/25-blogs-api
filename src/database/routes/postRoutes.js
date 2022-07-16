const { Router } = require('express');
const postController = require('../controllers/postController');
const auth = require('../middlewares/auth');

const postRoutes = Router();

postRoutes.get('/', auth, postController.list);

module.exports = postRoutes;