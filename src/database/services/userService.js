const { JWT_SECRET } = require('dotenv/config');
const Joi = require('joi');
const { User } = require('../models');
const jwtService = require('./jwtService');

const UserService = {

  validateBody: (data) => {
    const joiSchema = Joi.object({
      displayName: Joi.string().min(8).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      image: Joi.string().required(),
    });
    const { error, value } = joiSchema.validate(data);
    if (error) {
      error.status = 400;
      throw error;
    }
    return value;
  },

  async verifyIfEmailAlreadyRegistered(email) {
    const user = await User.findOne({ where: { email } });
    if (user) {
      const error = new Error('User already registered');
      error.status = 409;
      throw error;
    }
    return true;
  },

  async findUserId(data) {
    try {
      const { dataValues } = await User.findOne({ where: { email: data.email } });
      const { id } = dataValues;
      return id;
    } catch (e) {
      const error = new Error('User not found');
      error.status = 404;
      throw error;
    }
  },

  async create(data) {
    const { email } = await User.create(data);
    const token = jwtService.createUserToken(email, JWT_SECRET);
    return token;
  },

  async list() {
    const users = await User.findAll({ attributes: ['id', 'displayName', 'email', 'image'] });
    return users;
  },

  async getById(id) {
    const user = await User.findOne({
      where: { id },
      attributes: ['id', 'displayName', 'email', 'image'],
    });

    if (!user) {
      const error = new Error('User does not exist');
      error.status = 404;
      throw error;
    }

    return user;
  },

  async delete(id) {
    User.destroy({ where: { id } });
  },

};

module.exports = UserService;