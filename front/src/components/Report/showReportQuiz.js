import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { SubmitQuizModel } from "../../models/submitQuiz";
import { Quiz } from "../../models/quiz";

import { SubmittedQuizService } from "../../services/submittedQuizService";
import { QuizzesService } from "../../services/quizzesService";
import { Navbar } from "../navbar";
import { Pagination } from "../pagination";


export function ShowReportQuiz(props) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [dataQuiz, setDataQuiz] = useState([{ Quiz }]);


  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  //


  const [dataSubmitQuiz, setDataSubmitQuiz] = useState([{ SubmitQuizModel }]);
  const [dateFilter, setDateFilter] = useState({
    startDate: null,
    endDate: null,
  });

  const gradeArr = [dataSubmitQuiz.grade];

  const quizzesService = QuizzesService();
  const submittedQuizService = SubmittedQuizService();

  async function fetchData(_id) {
    const finishQuizStudentName =
      await submittedQuizService.getAllSubmittedQuiz(_id);
    setDataSubmitQuiz(finishQuizStudentName);
  }

  var Avgmarks = 0;

  for (var i = 0; i < dataSubmitQuiz?.length; i++) {
    Avgmarks += dataSubmitQuiz[i]?.grade;
    var avg = Avgmarks / dataSubmitQuiz.length;
  }

  useEffect(() => {
    fetchData(id);
  }, []);

  var Avgmarks = 0;

  return (
    <div>
      <Navbar></Navbar>
      <div style={{ display: "inline-block" }}>
        <div style={{ display: "inline-block" }}>
          Date Range: from:
          <input
            type="date"
            style={{ width: "170px" }}
            onChange={(e) => setDateFilter({ startDate: e.target.value })}
          ></input>
        </div>
        &nbsp;
        <div style={{ display: "inline-block" }}>
          to:
          <input
            type="date"
            style={{ width: "170px" }}
            onChange={(e) => setDateFilter({ endDate: e.target.value })}
          ></input>
        </div>
      </div>

      <h1>Average grade: {avg}</h1>

      <table className="table table-striped">
        <tbody>
          <tr>
            <th>Student Id</th>
            <th>Date</th>
            <th>Grade</th>
            <th>Passed</th>
          </tr>
          {dataSubmitQuiz.slice(indexOfFirstPost, indexOfLastPost)
            .filter((row) => {
              let filterPass = true;
              const date = new Date(row.date);
              if (dateFilter.startDate) {
                filterPass =
                  filterPass && new Date(dateFilter.startDate) < date;
              }
              if (dateFilter.endDate) {
                filterPass = filterPass && new Date(dateFilter.endDate) > date;
              }
              return filterPass;
            })
            ?.map((item, key) => {
              return (
                <tr key={key}>
                  <td>{item.studentId} </td>
                  <td>{item.date}</td>
                  <td>{item.grade}</td>
                  <td
                    style={
                      !item?.passed ? { color: "red" } : { color: "green" }
                    }
                  >
                    {!item?.passed ? "Failed" : "Passed"}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <Pagination
          postsPerPage={postsPerPage}
          totalPosts={dataSubmitQuiz.length}
          paginate={paginate}
        />
    </div>
  );
}
