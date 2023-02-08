const { SubmittedQuiz, Student, Quiz } = require("../../schemes/models");
const mongoose = require("mongoose");
const { checkSubmittedQuiz } = require("../../bl/quizLogic");
mongoose.set("strictQuery", true);

const getSubmittedQuizzes = () => {
  return SubmittedQuiz.find({});
};
const getSubmittedQuizById = (id) => {
  return SubmittedQuiz.find({ _id: id });
};

const getAllSubmittedQuiz = async (quizId) => {
  const res = await SubmittedQuiz.find({ quizId: quizId });
  return res;
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
          studentId: subQuiz.studentId,
          grade: checkedQuiz.grade,
          wrongAnswers: [...checkedQuiz.wrongAnswers],
          passed: checkedQuiz.passed,
          message: checkedQuiz.message,
        }
      );
      await Student.findByIdAndUpdate(
        { _id: subQuiz.studentId },
        { $push: { submittedQuizzes: subQuizModel._id } }
      );
      await Quiz.findByIdAndUpdate(
        { _id: subQuiz.quizId._id },
        { active: true }
      );
      return checkedQuiz;
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getSubmittedQuizzes,
  getSubmittedQuizById,
  getAllSubmittedQuiz,
  addSubmittedQuiz,
};
