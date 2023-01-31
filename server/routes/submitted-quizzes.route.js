const express = require("express");
const router = express.Router();
const {
  getSubmittedQuizzes,
  addSubmittedQuiz,
} = require("../dal/mongo/submittedQuizzesContext");
const { checkSubmittedQuiz } = require("../bl/quizLogic");

router.get("/", (req, res) => {
  getSubmittedQuizzes().then((data) => res.send(data));
});

router.post("/", (req, res) => {
  const { body } = req;
  addSubmittedQuiz(body).then((data) => res.send(data));
});

module.exports = router;
