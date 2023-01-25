import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { QuizzesService } from "../../services/quizzesService";
import { Quiz } from "../../models/quiz";

export function StartQuiz() {
  let { quizid, studentid } = useParams();
  const { loadQuiz } = QuizzesService();
  const [quiz, setQuiz] = useState(Quiz);

  useEffect(() => {
    //loadQuiz(quizid).then((resp) => setQuiz(resp));
  }, []);

  return (
    <div>
      <h1>Good Luck!</h1>
      <div>{console.log(quiz)}</div>
    </div>
  );
}
