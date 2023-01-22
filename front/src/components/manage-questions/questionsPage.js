import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { QuestionService } from "../../services/questionsService";
import "./questionsPage.css";

export function QuestionsPage() {
  const [questions, setQuestions] = useState([]);

  const service = QuestionService();

  let navigate = useNavigate();

  async function deleteData(_id) {
    const arr = await service.deleteQuestion(_id);
    setQuestions(arr);
  }

  useEffect(() => {
    async function fetchData() {
      const arr = await service.getQuestion();
      setQuestions(arr);
    }
    fetchData();
  }, []);

  return (
    <div>
      <div className="topnav">
        <button className="btnNav" onClick={() => navigate("../")}>
          Home
        </button>
      </div>
      <div>
        <form
          style={{ margin: "auto", textAlign: "center" }}
          className="d-flex"
        >
          <input
            style={{ width: "300px", margin: "auto" }}
            className="form-control me-2"
            type="text"
            placeholder="Search..."
          ></input>
          <button
            style={{ margin: "auto", marginLeft: "0" }}
            className="btn btn-primary"
            type="button"
          >
            Search
          </button>
        </form>
      </div>

      <h1>Questions</h1>
      <div>
        <button onClick={() => navigate("/newQuestionPage")}>
          New Question
        </button>
      </div>

      <table className="table table-striped">
        <tbody>
          <tr>
            <th>Id</th>
            <th>Question</th>
            <th>last update</th>
            <th>question type</th>
            <th>function</th>
          </tr>
          {questions?.map((item, key) => {
            return (
              <tr key={key}>
                <td>{item._id}</td>
                <td>{item.body}</td>
                <td>10.08.22</td>
                <td>single</td>
                <td>
                  <button className="btn btn-success">show</button>
                  <button className="btn btn-success">edit</button>
                  <button
                    onClick={() => deleteData(item._id)}
                    className="btn btn-danger"
                  >
                    delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
