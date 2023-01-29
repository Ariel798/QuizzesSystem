const { SubmittedQuiz } = require("../../schemes/models");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const getSubmittedQuizzes = () => {
  return SubmittedQuiz.find({});
};

const getAllSubmittedQuiz = (_id) => {
  return SubmittedQuiz.find({quizId: _id});
};

const addSubmittedQuiz = async (subQuiz) => {
  const subQuizModel = new SubmittedQuiz(subQuiz);
  return await subQuizModel.save();
};

module.exports = {
  getSubmittedQuizzes,
  getAllSubmittedQuiz,
  addSubmittedQuiz,
};
