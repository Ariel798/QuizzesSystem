import React, { useEffect, useState } from "react";
import { QuestionService } from "../../services/questionsService";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar } from "../navbar";

export function EditQuestionPage() {
  //use state
  const [question, setQuestion] = useState({});
  const service = QuestionService();
  let { questionid } = useParams();

  async function editQuestion(_id) {
    const editQuestion = await service.editQuestion(_id);
    setQuestion(editQuestion);
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
      <h1>{question.body}</h1>

      {question.answers?.map((item, key) => {
        return (
          <div key={key}>
            <span> Answer: {item}</span>
            <input
              type="text"
              value={item.answers}
              onChange={(e) => setQuestion(e.target.value)}
            ></input>
            <input type="radio"></input>
          </div>
        );
      })}
      <button
        className="btn btn-primary"
        type="submit"
        onClick={() => editQuestion(question)}
      >
        update
      </button>
    </div>
  );
}
