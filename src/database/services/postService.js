const { BlogPost, User, Category } = require('../models');

const PostService = {

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