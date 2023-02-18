import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Quiz } from "../../models/quiz";
import { QuizzesService } from "../../services/quizzesService";
import { StudentQuizService } from "../../services/studentQuizService";
import { SubmittedQuizService } from "../../services/submittedQuizService";
import { Navbar } from "../navbar";

export function ReportByQuiz() {
  const navigate = useNavigate();
  const quizzesService = QuizzesService();
  const submittedQuizService = SubmittedQuizService();
  const [dataQuiz, setDataQuiz] = useState([Quiz]);
  const [quizId, setQuizId] = useState();

  // const [fromDate, setFromDate] = useState([]);
  // const [toDate, setToDate] = useState([]);

  // const handleToDate = (e) => {
  //   const getToValue = e.target.value;
  //   console.log(getToValue);
  //   setToDate(getToValue);
  // };

  // const handleFromDate = (e) => {
  //   const getFromValue = e.target.value;
  //   setFromDate(getFromValue);
  // }

  const detailsOfReport = (_id) => {
    navigate(`/showReportQuiz/${_id}`);
  };

  const updateQuizIdState = (value) => {
    setQuizId((pre) => {
      pre = value;
      return pre;
    });
  };

  useEffect(() => {
    quizzesService.getQuizzes().then((resList) => {
      setDataQuiz((pre) => {
        pre = [...resList];
        return pre;
      });
    });
  }, []);

  return (
    <div>
      <Navbar></Navbar>
      <div>
        select test:
        <form>
          <div>
            <select
              defaultValue=""
              onChange={(e) => updateQuizIdState(e.target.value)}
            >
              <option value="" disabled>
                Select one
              </option>
              {dataQuiz.map((item, key) => {
                return (
                  <option value={item._id} key={key}>
                    {item.name}
                  </option>
                );
              })}
            </select>
            <div></div>
          </div>
         
          <div>
            <button
              style={{ marginTop: "30px" }}
              type="button"
              className="button"
              onClick={() => detailsOfReport(quizId)}
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
