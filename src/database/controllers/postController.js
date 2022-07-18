const jwtService = require('../services/jwtService');
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

  async create(req, res) {
    const { authorization } = req.headers;

    const { data } = await jwtService.verifyToken(authorization);

    const validPost = PostService.validateBody(req.body);

    const post = await PostService.create(data, validPost);
    return res.status(201).json(post);
  },

};

module.exports = PostController;