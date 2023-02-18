import "./newQuestionPage.css";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Question } from "../../../models/question";
import { QuestionService } from "../../../services/questionsService";
import { Navbar } from "../../navbar";

export function NewQuestionPage() {
  const [answer, setAnswer] = useState("");
  const [answersArr, setAnswers] = useState([]);
  const [multiAnswers, setMultiAnswers] = useState([]);
  const [quesModel, setQuesModel] = useState(Question);
  const service = QuestionService();
  let navigate = useNavigate();
  const inputElement = useRef();
  useEffect(() => {}, []);
  const focusInput = () => {
    inputElement.current.focus();
  };
  const addToAnswers = () => {
    const tempList = [...answersArr];
    tempList.push(answer);
    setAnswers([...tempList]);
    setAnswer("");
    focusInput();
  };
  const selectCorrect = (e) => {
    if (quesModel["multiAns"]) {
      let tempArr = [...multiAnswers];
      tempArr.push(e.target.id);
      const filtered = tempArr.filter(
        (item, index) => tempArr.indexOf(item) === index
      );
      setMultiAnswers([...filtered]);
      return;
    }
    let tmp = { ...quesModel };
    tmp[e.target.name] = e.target.id;
    setQuesModel(tmp);
  };
  const changeModel = (e) => {
    if (e.target.type === "checkbox") {
      let tmp = { ...quesModel };
      tmp[e.target.name] = e.target.checked;
      setQuesModel(tmp);
      return;
    }
    let tmp = { ...quesModel };
    tmp[e.target.name] = e.target.value;
    setQuesModel(tmp);
  };
  const saveAnsModel = () => {
    let tmp = { ...quesModel };
    tmp["answers"] = [...answersArr];
    tmp["correctAnswersArr"] = [...multiAnswers];
    setQuesModel(tmp);
    postQuestion(tmp).then(() => {
      navigate("../questionsPage");
    });
  };

  async function postQuestion(question) {
    await service.addQuestion(question);
  }

  return (
    <div>
      <Navbar />
      <h1>New Question</h1>
      <div>
        <h4>Subject</h4>
        <select name="subject" defaultValue="" onChange={changeModel}>
          <option value="" disabled>
            Select one
          </option>
          <option value="development">Development</option>
        </select>
      </div>
      <div>
        <h4>Question</h4>
        <textarea
          type="text"
          name="body"
          value={quesModel.body}
          onChange={changeModel}
        ></textarea>
      </div>
      <div>
        <h4>Multiple answers</h4>
        <input
          name="multiAns"
          value={quesModel.multiAns}
          onChange={changeModel}
          type="checkbox"
        ></input>
      </div>
      <div>
        <h4>Add Answer:</h4>
        <input
          ref={inputElement}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        ></input>
        <button
          style={{ width: "50px", height: "50px", marginBottom: "30px" }}
          className="plusButton"
          onClick={() => addToAnswers()}
        >
          +
        </button>
      </div>
      <div>
        {quesModel["multiAns"]
          ? answersArr.map((answer, index) => (
              <button
                style={{
                  margin: "auto",
                  marginTop: "10px",
                  marginBottom: "10px",
                  borderRadius: "5px",
                  width: "200px",
                  wordWrap: "break-word",
                  display: "block",
                  border: "solid",
                  borderWidth: "3px",
                  alignItems: "center",
                }}
                className="answer"
                key={index}
              >
                {answer}, {index}
                <input
                  id={index}
                  onClick={selectCorrect}
                  style={{ float: "right" }}
                  name="correctAnswer"
                  type="checkbox"
                ></input>
              </button>
            ))
          : answersArr.map((answer, index) => (
              <button
                style={{
                  margin: "auto",
                  marginTop: "10px",
                  marginBottom: "10px",
                  borderRadius: "5px",
                  width: "200px",
                  wordWrap: "break-word",
                  display: "block",
                  border: "solid",
                  borderWidth: "3px",
                  alignItems: "center",
                }}
                className="answer"
                key={index}
              >
                {answer}, {index}
                <input
                  id={index}
                  onClick={selectCorrect}
                  style={{ float: "right" }}
                  name="correctAnswer"
                  type="radio"
                ></input>
              </button>
            ))}
      </div>
      <div>
        <button className="saveBtn button" onClick={() => saveAnsModel()}>
          Save
        </button>
      </div>
    </div>
  );
}
