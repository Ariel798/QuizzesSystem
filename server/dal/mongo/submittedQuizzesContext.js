const { SubmittedQuiz } = require("../../schemes/models");
const mongoose = require("mongoose");
const { checkSubmittedQuiz } = require("../../bl/quizLogic");
mongoose.set("strictQuery", true);

const getSubmittedQuizzes = () => {
  return SubmittedQuiz.find({});
};

const addSubmittedQuiz = async (subQuiz) => {
  try {
    const subQuizModel = new SubmittedQuiz(subQuiz);
    const data = await subQuizModel.save();
    if (data) {
      const subQuiz = await data.populate("quizId");
      await subQuiz.quizId.populate("questions");
      const checkedQuiz = checkSubmittedQuiz(data);
      await SubmittedQuiz.findByIdAndUpdate(
        { _id: subQuizModel._id },
        {
          grade: checkedQuiz.subQuiz.grade,
          wrongAnswers: [...checkedQuiz.subQuiz.wrongAnswers],
        }
      );
      return checkedQuiz;
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getSubmittedQuizzes,
  addSubmittedQuiz,
};
