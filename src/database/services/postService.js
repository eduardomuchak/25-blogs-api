const Sequelize = require('sequelize');
const Joi = require('joi');
const { BlogPost, User, Category, PostCategory } = require('../models');

const config = require('../config/config');

const sequelize = new Sequelize(config.development);

const PostService = {

  validateBody: (data) => {
    const joiSchema = Joi.object({
      title: Joi.string().required(),
      content: Joi.string().required(),
      categoryIds: Joi.array().items(Joi.number().required()),
    });
    const { error, value } = joiSchema.validate(data);
    if (error) {
      const myError = new Error('Some required fields are missing');
      myError.status = 400;
      throw myError;
    }
    return value;
  },

  validateBodyCategoriesId: (data) => {
    const joiSchema = Joi.array().items(Joi.number().required());
    const { error, value } = joiSchema.validate(data);
    if (error) {
      error.status = 400;
      throw error;
    }
    return value;
  },

  async create(data, validPost) {
    const result = await sequelize.transaction(async (transaction) => {
      const { dataValues } = await User.findOne({ where: { email: data.email } });
      const { id } = dataValues;
      const { title, content, categoryIds } = validPost;
      const post = await BlogPost.create({
        title,
        content,
        userId: id,
        categoryIds,
      }, { transaction });
      const categories = validPost.categoryIds.map((categoryId) => ({
        postId: post.id,
        categoryId,
      }));
      await PostCategory.bulkCreate(categories, { transaction });
      return post;
    });
    return result;
  },

  async list() {
    const postsWithUsersAndCategories = await BlogPost.findAll({
      include: [
        { model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });

    return postsWithUsersAndCategories;
  },

  async getById(id) {
    const postWithUserAndCategories = await BlogPost.findByPk(id, {
      include: [
        { model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });

    if (!postWithUserAndCategories) {
      const error = new Error('Post does not exist');
      error.status = 404;
      throw error;
    }

    return postWithUserAndCategories;
  },

};

module.exports = PostService;