require('dotenv/config');
const Joi = require('joi');
const { User } = require('../models');
const jwtService = require('./jwtService');

const joiSchema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  image: Joi.string().required(),
});

const UserService = {

  async create(data) {
    const { email } = await User.create(data);
    const token = jwtService.createUserToken(email, process.env.JWT_SECRET);
    return token;
  },

};

module.exports = { UserService, joiSchema };