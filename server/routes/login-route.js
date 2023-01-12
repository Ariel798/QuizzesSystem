const express = require("express");
const router = express.Router();
const { getAdmins } = require("../dal/users");
const {createToken,vertifyToken} = require('../lib/jwt')
router.get('/',(req,res)=>{
  const {adminid} = req.headers;
  const admins = getAdmins()
  const admin = admins.filter(i => i.id === adminid)[0]
  return res.send(admin)
})
router.post("/", async (req, res) => {
  const { userName, password } = req.body;
  const admins = getAdmins()
  const admin = admins.find(i => i.userName === userName && i.password === password)
  if(!admin){
    return res.sendStatus(404)
  }
  const id = admin.id;
  return res.send({id})
});
module.exports = router;