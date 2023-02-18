import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SubmitQuizModel } from "../../models/submitQuiz";
import { Quiz } from "../../models/quiz";

import { SubmittedQuizService } from "../../services/submittedQuizService";
import { QuizzesService } from "../../services/quizzesService";
import { Navbar } from "../navbar";

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
  const navWrongAnswers = (item) => {
    navigate("/wrongAnswers/" + item._id + "/" + item.studentId);
  };
  useEffect(() => {
    fetchData(id);
  }, []);

  return (
    <div>
      <Navbar></Navbar>
      <table className="table table-striped">
        <tbody>
          <tr>
            <th>Student Id</th>
            <th>Date</th>
            <th>Grade</th>
            <th>Passed</th>
            <th>Function</th>
          </tr>
          {dataSubmitQuiz?.map((item, key) => {
            return (
              <tr key={key}>
                <td>{item.studentId} </td>
                <td>{item.date} </td>
                <td>{item.grade}</td>
                <td
                  style={!item?.passed ? { color: "red" } : { color: "green" }}
                >
                  {!item?.passed ? "Failed" : "Passed"}
                </td>
                <td>
                  <button
                    className="button"
                    onClick={() => navWrongAnswers(item)}
                  >
                    Examine
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
