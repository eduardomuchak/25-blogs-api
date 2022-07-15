const { LoginService, joiSchema } = require('../services/loginService');

const LoginController = {

  async login(req, res) {
    const { error } = joiSchema.validate(req.body);

    if (error) {
      const [status, message] = error.details[0].message.split('|');
      return res.status(Number(status)).json({ message });
    }

    const { email, password } = req.body;
    const token = await LoginService.login(email, password);

    if (!token) {
      return res.status(400).json({ message: 'Invalid fields' });
    }

    return res.json({ token });
  },
};

module.exports = LoginController;