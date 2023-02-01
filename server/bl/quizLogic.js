function checkSubmittedQuiz(subQuiz) {
  const errorWeight = 100 / subQuiz.quizId.questions.length;
  let grade = 100;
  let quesNum = 0;
  let wrongAnswersArr = [];
  for (let question in subQuiz.quizId.questions) {
    if (
      Number(subQuiz.quizId.questions[quesNum].correctAnswer) ==
      subQuiz.answers[quesNum]
    ) {
    } else {
      wrongAnswersArr.push(Number(subQuiz.answers[quesNum]));
      grade -= errorWeight;
    }
    quesNum++;
  }
  subQuiz.wrongAnswers = [...wrongAnswersArr];
  subQuiz["grade"] = Math.round(grade);
  return subQuiz;
}

module.exports = {
  checkSubmittedQuiz,
};
