require('dotenv/config');
const jwt = require('jsonwebtoken');

const jwtService = {
  createToken: (data) => {
    const token = jwt.sign({ data }, process.env.JWT_SECRET);
    return token;
  },

  createUserToken: (data) => {
    const token = jwt.sign({ data }, process.env.JWT_SECRET);
    return token;
  },

  verifyToken: (token) => {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    return data;
  },
};

module.exports = jwtService;