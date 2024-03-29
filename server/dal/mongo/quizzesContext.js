const { Quiz } = require("../../schemes/models");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const getQuizzes = async () => {
  return Quiz.find({});
};

const loadQuiz = async (id) => {
  try {
    const quiz = await Quiz.findById(id);
    await quiz.populate("questions");
    return quiz;
  } catch (error) {
    return null;
  }
};

const addQuiz = async (quiz) => {
  const newQuiz = new Quiz(quiz);
  return await newQuiz.save();
};

const deleteQuiz = async (id) => {
  try {
    return Quiz.deleteOne({ _id: id })
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
const editQuiz = (quiz) => {
  Quiz.updateOne({ _id: quiz._id }, { $set: { ...quiz } }, (err, docs) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Updated Docs : ", docs);
    }
  });
};

module.exports = {
  getQuizzes,
  loadQuiz,
  addQuiz,
  deleteQuiz,
  editQuiz,
};
