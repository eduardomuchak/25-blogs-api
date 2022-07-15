const UserService = require('../services/userService');

const UserController = {

  async create(req, res) {
    const { displayName, email, password, image } = req.body;
    const validUser = UserService.validateBody(req.body);

    await UserService.verifyIfEmailAlreadyRegistered(validUser.email);

    const token = await UserService.create({ displayName, email, password, image });

    return res.status(201).json({ token });
  },
};

module.exports = UserController;