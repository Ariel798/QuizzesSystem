import React, { useEffect, useState } from "react";
import { Form, useNavigate, useParams } from "react-router-dom";
import { StudentQuizService } from "../../services/studentQuizService";
import { StudentModel } from "../../models/student";
import { SubmitQuizModel } from "../../models/submitQuiz";
import { Navbar } from "../navbar";

export function ReportByStudent() {
  const studentQuizService = StudentQuizService();
  const navigate = useNavigate();
  const [students, setStudents] = useState([{ StudentModel }]);
  const [search, setSearch] = useState("");

  async function fetchData() {
    const arr = await studentQuizService.getStudents();
    setStudents(arr);
  }
  useEffect(() => {
    fetchData();
  }, []);

  const showDataStudent = (_id) => {
    navigate(`/showReportStudent/${_id}`);
  };

  return (
    <div>
      <Navbar></Navbar>
      <div>
        <form>
          <input
            type="text"
            placeholder="search by name..."
            onChange={(e) => setSearch(e.target.value)}
          ></input>
        </form>
        <table className="table table-striped">
          <tbody>
            <tr>
              <th>Id</th>
              <th>name</th>
              <th>email</th>
              <th>function</th>
            </tr>
            {students
              .filter((item) => {
                return search.toLowerCase() === ""
                  ? item
                  : item.fname.toLowerCase().includes(search);
              })
              ?.map((item, key) => {
                return (
                  <tr key={key}>
                    <td>{item._id} </td>
                    <td>
                      {item.fname} {item.lname}
                    </td>
                    <td>{item.email}</td>
                    <td>
                      <button
                        type="button"
                        className="button"
                        onClick={() => showDataStudent(item._id)}
                      >
                        select
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
