require("dotenv").config();
const express = require("express");
const cors = require("cors");
//

const { vertifyToken } = require("./lib/jwt");
const path =
  "mongodb+srv://Liorko310799:310799@mernlior.og9x762.mongodb.net/MernLior?retryWrites=true&w=majority";
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
mongoose.connect(path, (err) => {
  if (err) {
    console.log(err);
  }
});

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
app.use("/students", require("./routes/students.route"));
app.use("/login", require("./routes/login-route"));
app.use("/questions", require("./routes/questions.route"));
app.use("/quizzes", require("./routes/quizzes.route"));
app.use("/submittedquizzes", require("./routes/submitted-quizzes.route"));
//

app.listen(3001, (err) => {
  if (err) console.log(err);
  console.log("Server is listening on port", 3001);
});

process.on("SIGINT", function () {
  mongoose.connection.close(() => {
    process.exit();
  });
});
