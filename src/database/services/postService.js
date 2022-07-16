const { BlogPost, User, Category } = require('../models');

const PostService = {

  async list() {
    const postsWithUsersAndCategories = await BlogPost.findAll({
      include: [
        { model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });

    const categories = await Category.findAll();

    console.log(categories);

    return postsWithUsersAndCategories;
  },

};

module.exports = PostService;