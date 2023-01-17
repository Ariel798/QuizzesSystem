// const {
//   getQuestions,
//   addQuestion,
//   deleteQuestion,
//   editQuestion,
//   filterQuestions,
// } = require("../dal/fs/questions");

const {
  getQuestions,
  addQuestion,
  deleteQuestion,
  editQuestion,
  filterBySubject,
} = require("../dal/mongo/questionsContext");

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  getQuestions().then((questions) => res.send(questions));
});

router.get("/filter", (req, res) => {
  const { subject } = req.headers;
  filterBySubject(subject).then((questions) => res.send(questions));
});

router.post("/", (req, res) => {
  const { question } = req.body;
  addQuestion(question).then((resu) => res.send(resu));
});

router.delete("/:id", (req, res) => {
  try {
    const { id } = req.params;
    deleteQuestion(id).then(() => {
      getQuestions().then((questions) => res.send(questions));
    });
  } catch (err) {
    console.log(err);
  }
});

router.put("/", (req, res) => {
  const { question } = req.body;
  const updatedArr = editQuestion(question);
  res.send(updatedArr);
});

module.exports = router;
