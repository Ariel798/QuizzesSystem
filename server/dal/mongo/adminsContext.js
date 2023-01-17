const { Admin } = require("../../schemes/models");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const getAdmins = (username) => {
  return Admin.find({});
};

module.exports = {
  getAdmins,
};
