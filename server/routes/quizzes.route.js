const express = require("express");
const router = express.Router();
const { getQuestions } = require("../dal/mongo/questionsContext");
const {
  getQuizzes,
  addQuiz,
  deleteQuiz,
  editQuiz,
  loadQuiz,
} = require("../dal/mongo/quizzesContext");

router.get("/", (req, res) => {
  getQuizzes().then((quizzes) => res.send(quizzes));
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  loadQuiz(id).then(quiz=>res.send(quiz))
});

router.get("/new", (req, res) => {
  getQuestions().then((questions) => res.send(questions));
});

router.post("/", (req, res) => {
  const { body } = req;
  addQuiz(body).then((data) => res.send(data));
 console.log(body);
});

router.delete("/:id", (req, res) => {
  try {
    const { id } = req.params;
    deleteQuiz(id).then(() => {
      getQuizzes().then((quizzes) => res.send(quizzes));
    });
  } catch (err) {
    console.log(err);
  }
});

router.put("/", (req, res) => {
  const { quiz } = req.body;
  const updatedArr = editQuiz(quiz);
  res.send(updatedArr);
});
module.exports = router;
