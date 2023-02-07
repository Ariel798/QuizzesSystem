import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SubmitQuizModel } from "../../models/submitQuiz";

import { SubmittedQuizService } from "../../services/submittedQuizService";

export function EndScreenQuiz() {
  const [quizId, setQuizId] = useState();
  const [dataSubmitQuiz, setDataSubmitQuiz] = useState([{ SubmitQuizModel }]);
  const submittedQuizService = SubmittedQuizService();

  let { quizid, studentid } = useParams();

  async function fetchData(quizid) {
    const finishQuizStudentName =
      await submittedQuizService.getAllSubmittedQuiz(quizid);
    setDataSubmitQuiz(finishQuizStudentName);
  }

  useEffect(() => {
    fetchData(quizid);
  }, []);

  return (
    <div>
      <h1 style={{ background: "blue", color: "white" }}>its end screen </h1>
      <h2>name of test:{dataSubmitQuiz.nameOfQuiz} </h2>
      <hr></hr>
      <h2>your grade: {dataSubmitQuiz.grade}</h2>
      <hr></hr>
      <h2>status: "passed"</h2>
      <hr></hr>
      <h2>summary: "7 correct from 9"</h2>
      <hr></hr>
      <h2>passing grade: "70"</h2>

      <button>review your answer </button>
    </div>
  );
}
