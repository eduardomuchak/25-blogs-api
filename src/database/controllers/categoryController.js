const CategoryService = require('../services/categoryService');

const CategoryController = {

  async create(req, res) {
    const categoryName = CategoryService.validateBody(req.body);
    const { id, name } = await CategoryService.create(categoryName);

    return res.status(201).json({ id, name });
  },
};

module.exports = CategoryController;