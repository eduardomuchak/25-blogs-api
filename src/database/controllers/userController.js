const UserService = require('../services/userService');

const UserController = {

  async create(req, res) {
    const { displayName, email, password, image } = req.body;
    const validUser = UserService.validateBody(req.body);

    await UserService.verifyIfEmailAlreadyRegistered(validUser.email);

    const token = await UserService.create({ displayName, email, password, image });

    return res.status(201).json({ token });
  },

  async list(_req, res) {
    const users = await UserService.list();
    return res.status(200).json(users);
  },

  async getById(req, res) {
    const { id } = req.params;
    const user = await UserService.getById(id);
    return res.status(200).json(user);
  },
};

module.exports = UserController;