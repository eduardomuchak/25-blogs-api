const PostService = require('../services/postService');

const PostController = {

  async list(_req, res) {
    const posts = await PostService.list();
    return res.status(200).json(posts);
  },

  async getById(req, res) {
    const post = await PostService.getById(req.params.id);
    return res.status(200).json(post);
  },

};

module.exports = PostController;