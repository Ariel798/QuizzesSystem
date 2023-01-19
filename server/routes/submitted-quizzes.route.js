const express = require("express");
const router = express.Router();
const {
  getSubmittedQuizzes,
  addSubmittedQuiz,
} = require("../dal/mongo/submittedQuizzesContext");

router.get("/", (req, res) => {
  getSubmittedQuizzes().then((data) => res.send(data));
});

router.post("/", (req, res) => {
  const { quiz } = req.body;
  addSubmittedQuiz(quiz).then((data) => res.send(data));
});
//Run through submitted quizzes and check (Client ?)

module.exports = router;
