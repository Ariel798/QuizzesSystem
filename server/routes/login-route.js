const express = require("express");
const router = express.Router();
const { getAdmins } = require("../dal/mongo/adminsContext");
const { createToken } = require("../lib/jwt");
router.get("/", async (req, res) => {
  const { adminid } = req;
  const admins = await getAdmins();
  const admin = admins.filter((i) => i.id === adminid)[0];
  return res.send(admin);
});
router.post("/", async (req, res) => {
  const { userName, password } = req.body;
  const admins = await getAdmins();
  const admin = admins.find(
    (i) => i.userName === userName && i.password === password
  );
  if (!admin) {
    return res.sendStatus(404);
  }
  const token = createToken({ userid: admin.id });
  const id = admin.id;
  return res.send({ token });
});
module.exports = router;
