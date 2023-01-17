const { Question } = require("../../schemes/models");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const getQuestions = async () => {
  return Question.find({});
};

const addQuestion = async (question) => {
  const newQuestion = new Question(question);
  await newQuestion.save();
};

const deleteQuestion = (id) => {
  try {
    return Question.deleteOne({ _id: id })
      .then(function (res, err) {
        if (err) {
          console.log("err:", err);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (err) {
    console.log(err);
  }
};

const editQuestion = (question) => {
  Question.updateOne(
    { _id: question._id },
    { $set: { ...question } },
    (err, docs) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Updated Docs : ", docs);
      }
    }
  );
};

const filterBySubject = (subject) => {
  return Question.find({ subject: subject });
};

module.exports = {
  getQuestions,
  addQuestion,
  deleteQuestion,
  editQuestion,
  filterBySubject,
};
