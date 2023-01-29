const mongoose = require("mongoose");

const adminScheme = mongoose.Schema({
  userName: String,
  password: String,
});
const questionScheme = mongoose.Schema({
  number: Number,
  //check why number
  //   topicId: mongoose.Schema.Types.ObjectId
  //   typeId: mongoose.Schema.Types.ObjectId

  //add topic id
  subject: String,
  body: String,
  answers: Array, //[String]
  //tags: Array, //[String]
  correctAnswer: Number, //add correctAnswers  --> [String]
  quizzes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
    },
  ],
});
//add this Schema
//add topic to almost each schema(need to check)

// const company = mongoose.Schema({
//   name: String,
// })

const quizScheme = mongoose.Schema({
  name: String,
  subject: String,
  //isShowResults:Boolean
  //change : questionsId
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
});

const submittedQuizScheme = mongoose.Schema({
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
  nameOfQuiz: { type: String },
  grade: { type: Number, min: 0, max: 100 },
  date: { type: Date },
  passed: Boolean,
  answers: Array,
  wrongAnswers: Array,
});

const studentScheme = mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },

  //email need to be unique -
  //email send to student if success or fail
  email: { type: String, required: true },
  submittedQuizzes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubmittedQuiz",
    },
  ],
});

const Admin = mongoose.model("Admin", adminScheme);
const Quiz = mongoose.model("Quiz", quizScheme);
const Question = mongoose.model("Question", questionScheme);
const SubmittedQuiz = mongoose.model("SubmittedQuiz", submittedQuizScheme);
const Student = mongoose.model("Student", studentScheme);

module.exports = {
  Admin,
  Quiz,
  Question,
  SubmittedQuiz,
  Student,
};
