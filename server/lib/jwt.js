const jwt = require("jsonwebtoken");

const secretJwt = "asdasdasdasd";

const vertifyToken = (token, callback) => {
  jwt.verify(token, secretJwt, callback);
};

const createToken = (payload) => {
  return jwt.sign(payload, secretJwt);
};

module.exports = {
  vertifyToken,
  createToken,
};
