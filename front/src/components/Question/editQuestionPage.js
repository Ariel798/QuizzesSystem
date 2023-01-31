import React, { useEffect, useState } from "react";
import { QuestionService } from "../../services/questionsService";
import { useNavigate, useParams } from "react-router-dom";

export function EditQuestionPage(props) {
  //use state
  const [question, setQuestion] = useState({});
  const service = QuestionService();
  let { id } = useParams();

  async function editQuestion(_id) {
    const editQuestion = await service.editQuestion(_id);
    setQuestion(editQuestion);
    console.log(editQuestion);
  }

  useEffect(() => {
    async function getQuestion(id) {
      const obj = await service.showQuestion(id);
      // console.log(obj);
      setQuestion(obj);
    }
    getQuestion(id);
  }, []);

  return (
    <div>
      <h1>edit is here:</h1>

      {question.answers?.map((item, key) => {
        return (
          <div key={key}>
            <span> Answer: </span>
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
      {/* <span> Answer: </span><input type="text" ></input><input type="radio" ></input> */}

      {/* <form >

                <div><span> the question?: </span><input type="text"></input></div>
                <div><span> Answer: </span><input type="text" value={question.answers} onChange={(e) => setQuestion(e.target.value)}></input><input type="radio" ></input></div>
                <div><span> Answer: </span><input type="text" value={question.answers} onChange={(e) => setQuestion(e.target.value)}></input><input type="radio" ></input></div>
                <div><span> Answer: </span><input type="text" value={question.answers} onChange={(e) => setQuestion(e.target.value)}></input><input type="radio" ></input></div>
                <div><span> Answer: </span><input type="text" value={question.answers} onChange={(e) => setQuestion(e.target.value)}></input><input type="radio" ></input></div>
            </form> */}
    </div>
  );
}
