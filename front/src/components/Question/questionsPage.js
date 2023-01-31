import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { QuestionService } from "../../services/questionsService";
import "./questionsPage.css";
import { Navbar } from "../navbar";

export function QuestionsPage() {
  const [questions, setQuestions] = useState([]);
  const [search, setSearch] = useState("");
  const service = QuestionService();
  let navigate = useNavigate();

  async function deleteData(_id) {
    if (window.confirm("Are you sure?")) {
      const arr = await service.deleteQuestion(_id);
      setQuestions(arr);
    }
  }
  async function showData(_id) {
    const question = await service.showQuestion(_id);
    alert(JSON.stringify(question));
  }

  useEffect(() => {
    async function fetchData() {
      const arr = await service.getQuestions();
      setQuestions(arr);
    }
    fetchData();
  }, []);

  return (
    <div>
      <Navbar/>
      <div>
        <form>
          <input
            type="text"
            placeholder="search by text..."
            onChange={(e) => setSearch(e.target.value)}
          ></input>
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
            <th>question text</th>
            <th>last update</th>
            <th>question type</th>
            <th>function</th>
          </tr>
          {questions
            .filter((item) => {
              return search.toLowerCase() === ""
                ? item
                : item.body.toLowerCase().includes(search);
            })
            ?.map((item, key) => {
              return (
                <tr key={key}>
                  <td>{item._id}</td>
                  <td>{item.body}</td>
                  <td>{item.date}</td>
                  <td>{item.type}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => showData(item._id)}
                    >
                      show
                    </button>
                    <button
                      className="btn btn-success"
                      onClick={() => navigate(`/editQuestionPage/${item._id}`)}
                    >
                      edit
                    </button>
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
