const mongoose = require("mongoose");

const adminScheme = mongoose.Schema({
  userName: String,
  password: String,
});
const questionScheme = mongoose.Schema({
  number: Number,
  subject: String,
  body: String,
  answers: Array,
  correctAnswer: Number,
  quizzes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
    },
  ],
});
const quizScheme = mongoose.Schema({
  name: String,
  subject: String,
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
});
const studentAnswersScheme = mongoose.Schema({
  quizId: String,
  answers: Array,
  wrongAnswers: Array,
});

const Admin = mongoose.model("Admin", adminScheme);
const Quiz = mongoose.model("Quiz", quizScheme);
const Question = mongoose.model("Question", questionScheme);
const StudentAnswer = mongoose.model("StudentAnswer", studentAnswersScheme);

module.exports = {
  Admin,
  Quiz,
  Question,
  StudentAnswer,
};
