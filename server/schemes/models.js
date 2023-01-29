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

// const topic = mongoose.Schema({
//   name: String,
//   companyId: mongoose.Schema.Types.ObjectId
// })

// const company = mongoose.Schema({
//   name: String,
// })

// const type = mongoose.Schema({
//   name: String,
// })

const quizScheme = mongoose.Schema({
  name: String,
  subject: String,
  //language: String 
  //type: String //random or predefine

  //succeed:String
  //failure:String

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
  grade: { type: Number, min: 0, max: 100 },
  date: { type: String },
  nameOfQuiz: { type: String},
  passed: Boolean,
  answers: Array,

  //delete  wrongAnswers: Array, =>
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
