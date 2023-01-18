const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("submitted-quizzes.route Works!");
});

module.exports = router;
