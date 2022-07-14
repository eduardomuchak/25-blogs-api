require('dotenv/config');
const Joi = require('joi');
const { User } = require('../models');
const jwtService = require('./jwtService');

const errorMessage = '400|Some required fields are missing';

const joiSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
}).messages({
  'string.base': errorMessage,
  'string.empty': errorMessage,
  'string.required': errorMessage,
  'any.required': errorMessage,
});

const LoginService = {

  async login(email, password) {
    const user = await User.findOne({ where: { email, password } });
    if (!user) {
      return null;
    }
    const token = jwtService.createToken({ email, password });
    return token;
  },
};

module.exports = { LoginService, joiSchema };