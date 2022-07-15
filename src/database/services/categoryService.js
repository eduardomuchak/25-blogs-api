const Joi = require('joi');
const { Category } = require('../models');

const CategoryService = {

  validateBody: (data) => {
    const joiSchema = Joi.object({
      name: Joi.string().required(),
    });
    const { error, value } = joiSchema.validate(data);
    if (error) {
      error.status = 400;
      throw error;
    }
    return value;
  },

  async create(name) {
    const categoryAdded = await Category.create(name);
    const { dataValues } = categoryAdded;
    return dataValues;
  },

  async list() {
    const categories = await Category.findAll();
    return categories;
  },

  async getById(id) {
    const category = await Category.findOne({
      where: { id },
    });
    if (!category) {
      const error = new Error('Category does not exist');
      error.status = 404;
      throw error;
    }
    return category;
  },
};

module.exports = CategoryService;