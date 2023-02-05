const {
  getQuestions,
  getQuestion,
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

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  const { path } = req;
  if (["/filter"].includes(path)) {
    return next();
  }
  getQuestion(id).then((question) => res.send(question));
});

router.get("/filter", async (req, res) => {
  const { subject } = req.headers;
  const questions = await filterBySubject(subject);
  res.send(questions);
});

router.post("/", (req, res) => {
  const { body } = req;
  addQuestion(body).then((resu) => res.send(resu));
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

router.put("/:id", (req, res) => {
  const { question } = req.body;
  const updatedArr = editQuestion(question);
  res.send(updatedArr);
});

module.exports = router;
