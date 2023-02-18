import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { QuestionService } from "../../services/questionsService";
import "./questionsPage.css";
import { Navbar } from "../navbar";
import { DetailsModal } from "../../ui-toolkit/detailsModal";
import { Pagination } from "../pagination";

export function QuestionsPage() {
  const [questions, setQuestions] = useState([]);
  const [search, setSearch] = useState("");

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  //

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
  async function fetchData() {
    const arr = await service.getQuestions();
    setQuestions(arr);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        <form>
          <input
            type="text"
            placeholder="search by text..."
            onChange={(e) => setSearch(e.target.value)}
            style={{background: "blue"}}
          ></input>
        </form>
      </div>

      <h1>Questions</h1>
      <div>
        <button onClick={() => navigate("/newQuestionPage")} className="btn btn-primary fa fa-plus">
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
          {questions
            .slice(indexOfFirstPost, indexOfLastPost)
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
                  <td>{item.multiAns ? "Multi" : "Single"}</td>
                  <td>
                    <DetailsModal item={item}></DetailsModal>
                    <button
                      className="btn btn-success fa fa-edit"
                      onClick={() => navigate(`/editquestionpage/${item._id}`)}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteData(item._id)}
                      className="btn btn-danger fa fa-trash"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={questions.length}
        paginate={paginate}
      />
    </div>
  );
}
