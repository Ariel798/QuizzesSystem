require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { vertifyToken } = require("./lib/jwt");
const { Admin, Quiz, Question } = require("./schemes/models");
const { getQuestions } = require("./dal/mongo/questionsContext");
const path = "mongodb://localhost:27017/quizzesSystem";
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
mongoose.connect(path, (err) => {
  if (err) {
    console.log(err);
  }
});
// const question1 = new Question({
//   number: null,
//   subject: "development",
//   body: "What is ?",
//   answers: [],
//   correctAnswer: 1,
// });

// const quiz1 = new Quiz({
//   subject: "Development",
//   authorId: "Teacher",
//   questions: [question1],
// });

// question1.save();
// quiz1.save();

// const admin1 = new Admin({ userName: "Mr.President", password: "A" });
// admin1.save();
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use((req, res, next) => {
  const { adminid } = req.headers;
  if (!adminid) {
    return next();
  }
  vertifyToken(adminid, (err, decoded) => {
    if (err) {
      return res.send("Invalid token!");
    }
    const { userid } = decoded;
    req.adminid = userid;
    next();
  });
});

app.use("/login", require("./routes/login-route"));
app.use("/questions", require("./routes/questions.route"));
app.use("/quizzes", require("./routes/quizzes.routes"));

app.listen(process.env.PORT, (err) => {
  if (err) console.log(err);
  console.log("Server is listening on port", process.env.PORT);
});

process.on("SIGINT", function () {
  mongoose.connection.close(() => {
    process.exit();
  });
});
