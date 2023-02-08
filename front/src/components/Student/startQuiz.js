import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { QuizzesService } from "../../services/quizzesService";
import { Quiz } from "../../models/quiz";
import { StudentQuizService } from "../../services/studentQuizService";
import { SubQuiz } from "../../models/subQuiz";

export function StartQuiz() {
  const [userAnswers, setuserAnswers] = useState([]);
  const [quesNum, setQuesNum] = useState(0);
  const [subQuiz, setSubQuiz] = useState({ SubQuiz });
  let [started, setStarted] = useState(false);
  let { quizid, studentid } = useParams();
  let { quizId, studentId } = useState();

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
    if (quesNum > 0) {
      setQuesNum((pre) => {
        pre = pre - 1;
        return pre;
      });
    }
  };
  const nextQuestion = () => {
    if (quesNum < userAnswers.length - 1) {
      setQuesNum((pre) => {
        pre = pre + 1;
        return pre;
      });
    }
  };
  const selectAnswer = ({ target }) => {
    const { id } = target;
    if (!quiz.questions[quesNum].multiAns) {
      setuserAnswers((pre) => {
        pre[quesNum] = id;
        return [...pre];
      });
    } else {
      let temp = [...userAnswers];
      if (temp[quesNum] === -1) {
        temp[quesNum] = [];
      }
      if (temp[quesNum].includes(id)) {
        const filtered = temp[quesNum].filter(
          (item) => Number(item) !== Number(id)
        );
        temp[quesNum] = [...filtered];
        setuserAnswers([...temp]);
        return;
      }
      temp[quesNum].push(id);
      const filtered = temp[quesNum].filter(
        (item, index) => temp[quesNum].indexOf(item) === index
      );
      temp[quesNum] = [...filtered];
      setuserAnswers([...temp]);
    }
  };
  const submitQuiz = () => {
    if (window.confirm("Are you sure?")) {
      let temp = {};
      temp["answers"] = [...userAnswers];
      temp["nameOfQuiz"] = quiz.name;
      temp["date"] = new Date().toLocaleDateString("en-US");
      temp["quizId"] = quiz._id;
      temp["studentId"] = studentid;
      setSubQuiz(temp);
      postSubmittedQuiz(temp).then((result) => {
        alert("Sent!");
        navigate("/endScreenQuiz/" + result._id);
      });
    }
  };

  useEffect(() => {
    loadQuiz(quizid).then((resp) => {
      setQuiz(resp);
      setuserAnswers(resp.questions.map(() => -1));
    });
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
              onClick={() => submitQuiz(quizId, studentId)}
            >
              Submit
            </button>
          </div>
          <div className="questionArea">
            {quiz.questions[quesNum]?.multiAns ? (
              <h1>
                {quiz.questions[quesNum]?.body} <br></br>
                <span>(multiple answers..)</span>
              </h1>
            ) : (
              <h1>{quiz.questions[quesNum]?.body}</h1>
            )}
            <div style={{ display: "block" }}>
              {quiz.questions[quesNum]?.multiAns
                ? quiz.questions[quesNum]?.answers.map((item, key) => {
                    if (
                      Array.isArray(userAnswers[quesNum]) &&
                      userAnswers[quesNum]?.includes(`${key}`)
                    ) {
                      return (
                        <div id={key} key={key} onClick={selectAnswer}>
                          <button
                            id={key}
                            name="answer"
                            className="btn btn-success"
                            style={{
                              margin: 5,
                              height: "70px",
                              width: "250px",
                              border: "6px solid",
                              boxShadow: `${"0px 0px 10px blue"}`,
                            }}
                            type="checkbox"
                          >
                            {item}
                          </button>
                        </div>
                      );
                    } else {
                      return (
                        <div id={key} key={key} onClick={selectAnswer}>
                          <button
                            id={key}
                            name="answer"
                            className="btn btn-success"
                            style={{
                              margin: 5,
                              height: "70px",
                              width: "250px",
                              border: "6px solid",
                              boxShadow: `${"none"}`,
                            }}
                            type="checkbox"
                          >
                            {item}
                          </button>
                        </div>
                      );
                    }
                  })
                : quiz.questions[quesNum]?.answers.map((item, key) => {
                    return (
                      <div id={key} key={key} onClick={selectAnswer}>
                        <button
                          id={key}
                          name="answer"
                          className="btn btn-primary"
                          style={{
                            margin: 5,
                            height: "70px",
                            width: "250px",
                            border: "6px solid",
                            boxShadow: `${
                              userAnswers[quesNum] == key
                                ? "0px 0px 10px blue"
                                : "none"
                            }`,
                          }}
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
          <h1 className="headline">Good Luck!</h1>
          <button className="startQuiz" onClick={() => startQuiz()}>
            Start
          </button>
        </div>
      )}
    </div>
  );
}
