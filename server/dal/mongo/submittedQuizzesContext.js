const { SubmittedQuiz } = require("../../schemes/models");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const getSubmittedQuizzes = () => {
  return SubmittedQuiz.find({});
};

const addSubmittedQuiz = async (subQuiz) => {
  const subQuizModel = new SubmittedQuiz(subQuiz);
  return await subQuizModel.save();
};

module.exports = {
  getSubmittedQuizzes,
  addSubmittedQuiz,
};