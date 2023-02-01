const { SubmittedQuiz, Student } = require("../../schemes/models");
const mongoose = require("mongoose");
const { checkSubmittedQuiz } = require("../../bl/quizLogic");
mongoose.set("strictQuery", true);

const getSubmittedQuizzes = () => {
  return SubmittedQuiz.find({});
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
        }
      );
      await Student.findByIdAndUpdate(
        { _id: subQuiz.studentId },
        { $push: { submittedQuizzes: subQuizModel._id } },
        (err, docs) => {
          if (err) {
            console.log(err);
          }
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
  getAllSubmittedQuiz,
  addSubmittedQuiz,
};
