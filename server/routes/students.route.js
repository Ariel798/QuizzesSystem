const express = require("express");
const router = express.Router();
const {
  checkAddStudent,
  getStudents,
  getStudentById,
  getStudentQuizzes,
} = require("../dal/mongo/studentsContext");

router.get("/", (req, res) => {
  getStudents().then((data) => res.send(data));
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  getStudentQuizzes(id).then((data) => res.send(data));
});
router.get("/:id", (req, res) => {
  const { id } = req.params;
  getStudentById(id).then((data) => res.send(data));
});
router.post("/", (req, res) => {
  const { body } = req;
  checkAddStudent(body).then((data) => res.send(data));
});

module.exports = router;
