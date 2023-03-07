function checkSubmittedQuiz(subQuiz) {
  const errorWeight = 100 / subQuiz.quizId.questions.length;
  let grade = 100;
  let quesNum = 0;
  let wrongAnswersArr = [];
  for (let q in subQuiz.quizId.questions) {
    wrongAnswersArr.push(-1);
    if (subQuiz.quizId.questions[quesNum].multiAns) {
      let correctM = arrayCompare(
        subQuiz.quizId.questions[quesNum].correctAnswersArr,
        subQuiz.answers[quesNum]
      );
      if (!correctM) {
        wrongAnswersArr.push(subQuiz.answers[quesNum]);
        grade -= errorWeight;
      }
      quesNum++;
      continue;
    }
    let correct =
      Number(subQuiz.quizId.questions[quesNum].correctAnswer) ===
      Number(subQuiz.answers[quesNum]);
    if (!correct) {
      wrongAnswersArr[quesNum] = Number(subQuiz.answers[quesNum]);
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

function arrayCompare(array1, array2) {
  if (array1.length === array2.length) {
    return array1.every((element) => {
      if (array2.includes(element)) {
        return true;
      }

      return false;
    });
  }

  return false;
}

module.exports = {
  checkSubmittedQuiz,
};
