import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QuizService } from "../../services/quizzesService";
export function QuizzesPage() {
  const [quizzes, setQuizzes] = useState([]);

  const service = QuizService();
  const navigate = useNavigate();

  async function deleteQuiz(_id) {
    const arr = await service.deleteQuiz(_id);
    setQuizzes(arr);
  }

  useEffect(() => {
    async function fetchQuiz() {
      const arr = await service.getQuizzes();
      setQuizzes(arr);
    }
    fetchQuiz();
  });

  return (
    <div>
      <div className="topnav">
        <button className="btnNav" onClick={() => navigate("../")}>
          Home
        </button>
      </div>
      <h1>QuizzesPage</h1>
      <div style={{ display: "flex inline-block" }}>
        <button onClick={()=>navigate("./newquiz")}>Generate New</button>
      </div>
      <div>
        <table className="table table-striped">
          <tbody>
            <tr>
              <th>Id</th>
              <th>Quiz</th>
              <th>quiz subject</th>
              <th></th>
            </tr>
            {quizzes?.map((item, key) => {
              return (
                <tr key={key}>
                  <td>{item._id}</td>
                  <td>{item.name}</td>
                  <td>single</td>
                  <td>
                    <button className="btn btn-success">Show</button>
                    <button className="btn btn-success">Edit</button>
                    <button
                      onClick={() => deleteQuiz(item._id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
