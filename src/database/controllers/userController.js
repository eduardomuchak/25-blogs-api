const { UserService, joiSchema } = require('../services/userService');

const UserController = {

  async create(req, res) {
    const { error } = joiSchema.validate(req.body);

    if (error) {
      const [code, message] = error.details[0].message.split('|');
      return res.status(Number(code)).json({ message });
    }

    const { displayName, email, password, image } = req.body;
    const token = await UserService.create({ displayName, email, password, image });

    return res.status(201).json({ token });
  },
};

module.exports = UserController;