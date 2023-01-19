const express = require("express");
const router = express.Router();
const {
  checkAddStudent,
  getStudents,
  getStudentQuizzes,
} = require("../dal/mongo/studentsContext");

router.get("/", (req, res) => {
  getStudents().then((data) => res.send(data));
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  getStudentQuizzes(id).then((data) => res.send(data));
});

router.post("/", (req, res) => {
  const { student } = req.body;
  checkAddStudent(student).then((data) => res.send(data));

  //.then((data) => res.send(data));
});

module.exports = router;
