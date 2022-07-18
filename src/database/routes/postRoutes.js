const { Router } = require('express');
const postController = require('../controllers/postController');
const auth = require('../middlewares/auth');

const postRoutes = Router();

postRoutes.get('/', auth, postController.list);
postRoutes.post('/', auth, postController.create);
postRoutes.get('/:id', auth, postController.getById);

module.exports = postRoutes;