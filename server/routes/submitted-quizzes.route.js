const express = require("express");
const router = express.Router();
const {
  getSubmittedQuizzes,
  addSubmittedQuiz,
  getAllSubmittedQuiz,
} = require("../dal/mongo/submittedQuizzesContext");
const { checkSubmittedQuiz } = require("../bl/quizLogic");

router.get("/", (req, res) => {
  getSubmittedQuizzes().then((data) => res.send(data));
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  getAllSubmittedQuiz(id).then((data) => res.send(data));
});

router.post("/", (req, res) => {
  const { body } = req;
  addSubmittedQuiz(body).then((data) => res.send(data));
});

module.exports = router;
