const jwtService = require('../services/jwtService');
const PostService = require('../services/postService');

const PostController = {

  async create(req, res) {
    const { categoryIds } = req.body;
    const { authorization } = req.headers;

    const { data } = await jwtService.verifyToken(authorization);

    const validPost = PostService.validateBody(req.body);

    await PostService.validateBodyCategoriesId(categoryIds);

    const post = await PostService.create(data, validPost);
    return res.status(201).json(post);
  },

  async list(_req, res) {
    const posts = await PostService.list();
    return res.status(200).json(posts);
  },

  async getById(req, res) {
    const { id } = req.params;
    const post = await PostService.getById(id);
    return res.status(200).json(post);
  },

  async update(req, res) {
    const { id } = req.params;
    const { authorization } = req.headers;

    const validPost = PostService.validateBodyUpdatePost(req.body);
    const { data } = await jwtService.verifyToken(authorization);

    const postToBeUpdated = await PostService.getById(id);

    await PostService.isUserAuthorized(postToBeUpdated, data);
    await PostService.update(validPost, id);

    const updatedPost = await PostService.getById(id);

    return res.status(200).json(updatedPost);
  },

  async search(req, res) {
    const { q } = req.query;
    const posts = await PostService.search(q);
    return res.status(200).json(posts);
  },

  async delete(req, res) {
    const { id } = req.params;
    const { authorization } = req.headers;

    const { data } = await jwtService.verifyToken(authorization);
    const postToBeDeleted = await PostService.getById(id);

    await PostService.isUserAuthorized(postToBeDeleted, data);
    await PostService.delete(id);
    return res.sendStatus(204);
  },

};

module.exports = PostController;