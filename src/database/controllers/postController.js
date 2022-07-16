const PostService = require('../services/postService');

const PostController = {

  async list(_req, res) {
    const posts = await PostService.list();
    return res.status(200).json(posts);
  },

};

module.exports = PostController;