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
  if (subQuiz.quizId["minGrade"] > subQuiz["grade"]) {
    subQuiz["passed"] = false;
    subQuiz["message"] = subQuiz.quizId["failedMessage"];
  } else {
    subQuiz["passed"] = true;
    subQuiz["message"] = subQuiz.quizId["passedMessage"];
  }
  return subQuiz;
}

function arrayCompare(_arr1, _arr2) {
  if (
    !Array.isArray(_arr1) ||
    !Array.isArray(_arr2) ||
    _arr1.length !== _arr2.length
  ) {
    return false;
  }

  const arr1 = _arr1.concat().sort();
  const arr2 = _arr2.concat().sort();

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}

module.exports = {
  checkSubmittedQuiz,
};
