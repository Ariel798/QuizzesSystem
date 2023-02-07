import "./newQuestionPage.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Question } from "../../../models/question";
import { QuestionService } from "../../../services/questionsService";

export function NewQuestionPage() {
  const [answer, setAnswer] = useState("");
  const [answersArr, setAnswers] = useState([]);
  const [quesModel, setQuesModel] = useState(Question);
  let correctAns = 0;
  const service = QuestionService();
  let navigate = useNavigate();
  useEffect(() => {}, []);

  const addToAnswers = () => {
    const tempList = [...answersArr];
    tempList.push(answer);
    setAnswers([...tempList]);
    setAnswer("");
  };

  const selectCorrect = (e) => {
    let tmp = { ...quesModel };
    tmp[e.target.name] = e.target.id;
    setQuesModel(tmp);
  };

  const changeModel = (e) => {
    let tmp = { ...quesModel };
    tmp[e.target.name] = e.target.value;
    setQuesModel(tmp);
  };

  const saveAnsModel = () => {
    let tmp = { ...quesModel };
    tmp["answers"] = [...answersArr];
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
      <div className="topnav">
        <button className="btnNav" onClick={() => navigate("../questionsPage")}>
          Questions
        </button>
      </div>
      <h1>New Question</h1>
      <div>
        <h4>Subject</h4>
        <input
          name="subject"
          value={quesModel.subject}
          disabled
          onChange={changeModel}
        ></input>
      </div>
      <div>
        <h4>Body of Question</h4>
        <textarea
          type="text"
          name="body"
          value={quesModel.body}
          onChange={changeModel}
        ></textarea>
      </div>
      <div>
        <span>Add Answer:</span>
        <input
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        ></input>
        <button className="plusButton" onClick={() => addToAnswers()}>
          +
        </button>
      </div>
      <div>
        {answersArr.map((answer, index) => (
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
        <button className="saveBtn" onClick={() => saveAnsModel()}>
          Save
        </button>
      </div>
    </div>
  );
}
