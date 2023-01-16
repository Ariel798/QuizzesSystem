const fs = require("fs");
const path = "./db/admins.json";
const getAdmins = () => {
  const admins = fs.readFileSync(path, "utf-8");
  const jsonArr = JSON.parse(admins);
  return jsonArr;
};

module.exports = {
  getAdmins,
};
