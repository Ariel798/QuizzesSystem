import React, { useEffect, useState } from "react";
import { QuestionService } from "../../services/questionsService";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar } from "../navbar";

export function EditQuestionPage() {
  const [question, setQuestion] = useState({});
  const service = QuestionService();
  let { questionid } = useParams();
  const navigate = useNavigate();

  const updateModel = ({ target }) => {
    let temp = { ...question };
    temp.answers[target.id] = target.value;
    setQuestion(temp);
  };

  const updateCorrectAns = (e) => {
    if (question["multiAns"]) {
      const tmpQues = { ...question };
      let tempArr = [...question.correctAnswersArr];
      if (tempArr.includes(e.target.id)) {
        const filtered = tempArr.filter(
          (item) => Number(item) !== Number(e.target.id)
        );
        tmpQues["correctAnswersArr"] = [...filtered];
        setQuestion(tmpQues);
        return;
      }
      tempArr.push(e.target.id);
      const filtered = tempArr.filter(
        (item, index) => tempArr.indexOf(item) === index
      );
      tmpQues["correctAnswersArr"] = [...filtered];
      setQuestion(tmpQues);
      return;
    }
    let tmp = { ...question };
    tmp[e.target.name] = Number(e.target.id);
    setQuestion(tmp);
  };

  function editQuestion() {
    service.editQuestion(question).then((resp) => {
      alert("Saved!");
      navigate("../questionspage");
    });
  }

  useEffect(() => {
    async function getQuestion(id) {
      const obj = await service.showQuestion(id);
      setQuestion(obj);
    }
    getQuestion(questionid);
  }, []);

  return (
    <div>
      <Navbar />
      <h1 className="headline" style={{ marginTop: "3rem" }}>
        {question.body}
      </h1>

      {question?.multiAns
        ? question.answers?.map((item, key) => {
            return (
              <div key={key}>
                <span style={{ color: "black" }}>Answer:</span>
                <input
                  id={key}
                  style={{ display: "inline-block", color: "black" }}
                  type="text"
                  value={item}
                  onChange={updateModel}
                ></input>
                <input
                  id={key}
                  style={{
                    display: "inline-block",
                    width: "auto",
                    minWidth: "20px",
                  }}
                  onChange={updateCorrectAns}
                  checked={question.correctAnswersArr.includes(`${key}`)}
                  type="checkbox"
                ></input>
              </div>
            );
          })
        : question.answers?.map((item, key) => {
            return (
              <div key={key}>
                <span style={{ color: "black" }}>Answer:</span>
                <input
                  id={key}
                  style={{ display: "inline-block", color: "black" }}
                  type="text"
                  value={item}
                  onChange={updateModel}
                ></input>
                <input
                  id={key}
                  type="radio"
                  name="correctAnswer"
                  style={{
                    display: "inline-block",
                    width: "auto",
                    minWidth: "20px",
                  }}
                  onChange={updateCorrectAns}
                  checked={question.correctAnswer === key}
                ></input>
              </div>
            );
          })}
      <button
        className="btn btn-primary"
        type="submit"
        onClick={() => editQuestion()}
      >
        update
      </button>
    </div>
  );
}
