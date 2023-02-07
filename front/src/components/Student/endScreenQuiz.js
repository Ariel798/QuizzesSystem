import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SubmitQuizModel } from "../../models/submitQuiz";
import { SubmittedQuizService } from "../../services/submittedQuizService";

export function EndScreenQuiz() {
  const [dataSubmitQuiz, setDataSubmitQuiz] = useState([{ SubmitQuizModel }]);
  const submittedQuizService = SubmittedQuizService();
  let { submittedId } = useParams();

  async function fetchData(submittedId) {
    const submittedQuiz = await submittedQuizService.getSubmittedQuizById(
      submittedId
    );
    setDataSubmitQuiz(submittedQuiz);
  }

  useEffect(() => {
    fetchData(submittedId);
  }, []);

  return (
    <div>
      <h2 style={{ background: "blue", color: "white" }}>
        name: {dataSubmitQuiz[0].nameOfQuiz}{" "}
      </h2>
      <hr></hr>
      <h2>grade: {dataSubmitQuiz[0].grade}</h2>
      <hr></hr>
      <h2 style={{ color: dataSubmitQuiz[0].passed ? "green" : "red" }}>
        status: {dataSubmitQuiz[0].passed ? "Pass" : "Fail"}
      </h2>
      <hr></hr>
      <h2>message: {dataSubmitQuiz[0].message}</h2>
      <hr></hr>
      <h2>
        summary: number of question {dataSubmitQuiz[0]?.answers?.length}{" "}
        <h2 style={{ color: "red" }}>
          wrong : {dataSubmitQuiz[0]?.wrongAnswers?.length}
        </h2>
      </h2>
      <hr></hr>
      <button>review your answer </button>
    </div>
  );
}
