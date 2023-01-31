import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SubmitQuizModel } from "../../models/submitQuiz";
import { Quiz } from "../../models/quiz";

import { SubmittedQuizService } from "../../services/submittedQuizService";
import { QuizzesService } from "../../services/quizzesService";

export function ShowReportQuiz() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [dataQuiz, setDataQuiz] = useState([{ Quiz }]);

  const [dataSubmitQuiz, setDataSubmitQuiz] = useState([{ SubmitQuizModel }]);

  const quizzesService = QuizzesService();
  const submittedQuizService = SubmittedQuizService();

  async function fetchData(_id) {
    const finishQuizStudentName =
      await submittedQuizService.getAllSubmittedQuiz(_id);
    setDataSubmitQuiz(finishQuizStudentName);
  }

  useEffect(() => {
    fetchData(id);
  }, []);

  return (
    <div>
      <div>
        quiz name: <h1>{dataQuiz.name}</h1>
      </div>

      <table className="table table-striped">
        <tbody>
          <tr>
            <th>name of student</th>
            <th>grade</th>
            <th>date</th>
          </tr>
          {dataSubmitQuiz?.map((item, key) => {
            return (
              <tr key={key}>
                <td>{item.studentId} </td>
                <td>{item.grade}</td>
                <td>{item.date}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
