import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { QuizzesService } from "../../services/quizzesService";
import { Quiz } from "../../models/quiz";
import { StudentQuizService } from "../../services/studentQuizService";
import { SubQuiz } from "../../models/subQuiz";

export function StartQuiz() {
  //Push with answerNum and its value
  const [userAnswers, setuserAnswers] = useState([]);
  const [quesNum, setQuesNum] = useState(0);
  const [subQuiz, setSubQuiz] = useState({ SubQuiz });
  let [started, setStarted] = useState(false);
  let { quizid, studentid } = useParams();
  const { loadQuiz } = QuizzesService();
  const navigate = useNavigate();
  const { postSubmittedQuiz } = StudentQuizService();
  const [quiz, setQuiz] = useState(Quiz);

  const startQuiz = () => {
    setStarted((pre) => {
      return !pre;
    });
  };
  const prevQuestion = () => {
    setQuesNum((pre) => {
      pre = pre - 1;
      return pre;
    });
  };
  const nextQuestion = () => {
    setQuesNum((pre) => {
      pre = pre + 1;
      return pre;
    });
  };
  const selectAnswer = ({ target }) => {
    const { id } = target;
    let temp = [...userAnswers];
    if (quesNum < userAnswers.length) {
      temp[quesNum] = id;
      setuserAnswers(temp);
    } else {
      temp.push(id);
      setuserAnswers((pre) => {
        pre = temp;
        return pre;
      });
    }
  };
  const submitQuiz = () => {
    if (window.confirm("Are you sure?")) {
      let temp = {};
      temp["answers"] = [...userAnswers];
      temp["nameOfQuiz"] = quiz.name;
      temp["date"] = new Date().toLocaleDateString("en-US");
      temp["quizId"] = quiz._id;
      setSubQuiz(temp);
      postSubmittedQuiz(temp).then(() => alert("Sent!"));
    }
  };

  useEffect(() => {
    loadQuiz(quizid).then((resp) => setQuiz(resp));
  }, []);

  return (
    <div>
      {started ? (
        <div>
          <div className="topnav ">
            <button
              className="btnNav btn-danger"
              onClick={() => setStarted(!started)}
            >
              Quit
            </button>
            <button
              className={
                userAnswers.length === quiz.questions.length
                  ? "btnNav btn-success"
                  : "btnNav btn-warning"
              }
              onClick={() => submitQuiz()}
            >
              Submit
            </button>
          </div>
          <div className="questionArea">
            <h1>{quiz.questions[quesNum]?.body}</h1>
            <div style={{ display: "block" }}>
              {quiz.questions[quesNum]?.answers.map((item, key) => {
                return (
                  <div id={key} key={key} onClick={selectAnswer}>
                    <button
                      id={key}
                      className="answerBtn"
                      style={{ margin: 5, height: "70px", width: "250px" }}
                      type="radio"
                    >
                      {item}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{ bottom: 0 }}>
            <button className="btnNav" onClick={() => prevQuestion()}>
              Prev
            </button>
            <button className="btnNav" onClick={() => nextQuestion()}>
              Next
            </button>
          </div>
        </div>
      ) : (
        <div>
          {" "}
          <h1 className="headline">Good Luck!</h1>
          <button className="startQuiz" onClick={() => startQuiz()}>
            Start
          </button>
        </div>
      )}
    </div>
  );
}
