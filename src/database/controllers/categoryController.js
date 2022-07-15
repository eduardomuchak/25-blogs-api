const CategoryService = require('../services/categoryService');

const CategoryController = {

  async create(req, res) {
    const categoryName = CategoryService.validateBody(req.body);
    const { id, name } = await CategoryService.create(categoryName);

    return res.status(201).json({ id, name });
  },

  async list(_req, res) {
    const categories = await CategoryService.list();
    return res.status(200).json(categories);
  },
};

module.exports = CategoryController;