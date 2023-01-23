import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { QuestionService } from "../../services/questionsService";
import "./questionsPage.css";

export function QuestionsPage() {
  const [questions, setQuestions] = useState([]);

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

  // async function editData(_id) {
  //   const editQuestion = await service.editQuestion(_id);
  //   navigate("/editQuestionPage/"+_id);
  //   setQuestions(editQuestion);
  //   console.log(editQuestion);
  // }

  // const handleSelect = (_id) => {
  //   navigate('/Players', {
  //     userId: id,
  //   });

  // };

  useEffect(() => {
    async function fetchData() {
      const arr = await service.getQuestions();
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
        <form className="d-flex">
          <input
            className="form-control me-2"
            type="text"
            placeholder="Search..."
          ></input>
          <button className="btn btn-primary" type="button">
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
            <th>question text</th>
            <th>question type</th>
            <th>function</th>
          </tr>
          {questions?.map((item, key) => {
            // _id, number, subject, body, answers, correctAnswer, quizzes
            return (
              <tr key={key}>
                <td>{item._id}</td>
                <td>{item.body}</td>
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
