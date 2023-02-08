import "./quizzesPage.css";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { QuizzesService } from "../../services/quizzesService";
import { QuizzesService } from "../../services/quizzesService";
import { Navbar } from "../navbar";

export function QuizzesPage() {
  const [quizzes, setQuizzes] = useState([]);
  const [search, setSearch] = useState("");
  const [showDetails, setShowDetails] = useState(false);

  const service = QuizzesService();
  let navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const arr = await service.getQuizzes();
      setQuizzes(arr);
    }
    fetchData();
  }, []);

  const linkClickHandler = (item) => {
    let url = "http://localhost:3000/studentquiz/" + item._id;
    navigator.clipboard.writeText(url);
    alert("link Copy!");
  };

  async function editQuiz(item) {
    navigate("./editquiz/" + item._id);
  }

  async function deleteData(_id) {
    if (window.confirm("Are you sure?")) {
      const arr = await service.deleteQuiz(_id);
      setQuizzes(arr);
    }
  }

  return (
    <div>
      <Navbar />
      <div>
        <div>
          <form>
            <input
              type="text"
              placeholder="search by name..."
              onChange={(e) => setSearch(e.target.value)}
            ></input>
          </form>

          <h1>QuizzesPage</h1>
          <div style={{ display: "flex", display: "inline-block" }}>
            <button onClick={() => navigate("/quizzespage/newquiz")}>
              Generate New
            </button>
          </div>
        </div>
        {showDetails && <div></div>}
        <table className="table table-striped">
          <tbody>
            <tr>
              <th>Id</th>
              <th>Link</th>
              <th>Test Name</th>
              <th>Subject</th>
              <th>Functions</th>
            </tr>
            {quizzes
              .filter((item) => {
                return search.toLowerCase() === ""
                  ? item
                  : item.name.toLowerCase().includes(search);
              })
              ?.map((item, key) => {
                return (
                  <tr key={key}>
                    <td>{item._id}</td>
                    <td>
                      <button
                        style={{ width: "80px", textAlign: "center" }}
                        onClick={() => linkClickHandler(item)}
                      >
                        Link
                      </button>
                    </td>
                    <td>{item.name}</td>
                    <td>{item.subject}</td>
                    <td>
                      <div
                        style={{ width: "80px", textAlign: "center" }}
                        className={
                          item.active ? "btn btn-success" : "btn btn-warning"
                        }
                      >
                        {item.active ? "Active" : "Inactive"}
                      </div>
                      <button
                        style={{
                          width: "80px",
                          textAlign: "center",
                          marginLeft: "2px",
                        }}
                        className="btn btn-success"
                        onClick={() => editQuiz(item)}
                      >
                        Edit
                      </button>
                      <button
                        style={{ width: "80px", textAlign: "center" }}
                        onClick={() => deleteData(item._id)}
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
