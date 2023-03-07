import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StudentQuizService } from "../../services/studentQuizService";
import { StudentModel } from "../../models/student";

export function StudentQuiz() {
  let { quizid } = useParams();

  const service = StudentQuizService();

  const [newStudent, setStudent] = useState(StudentModel);

  let navigate = useNavigate();

  const changeModel = (e) => {
    let tmp = { ...newStudent };
    tmp[e.target.name] = e.target.value;
    setStudent(tmp);
  };

  const saveStudentModel = () => {
    let tmp = { ...newStudent };
    setStudent(tmp);
    postStudent(tmp).then((resp) => {
      navigate("/startquiz/" + quizid + "/" + resp._id);
    });
  };

  async function postStudent(student) {
    return await service.checkAddStudent(student);
  }

  return (
    <div
      style={{
        height: "100%",
        backgroundColor: "#FFD580",
        verticalAlign: "center",
      }}
    >
      <h1 className="headline">Fill Student Details</h1>
      <div className="main">
        <form style={{ marginTop: "10%" }}>
          <input
            style={{ width: "15rem" }}
            type="text"
            value={newStudent.fname}
            onChange={changeModel}
            name="fname"
            placeholder="First Name"
            required
          />
          <input
            style={{ width: "15rem" }}
            value={newStudent.lname}
            onChange={changeModel}
            type="text"
            name="lname"
            placeholder="Last Name"
            required
          />
          <input
            style={{ width: "15rem" }}
            value={newStudent.email}
            onChange={changeModel}
            type="email"
            name="email"
            pattern="/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/"
            placeholder="E-mail"
            required
          />
          <button
            style={{ width: "15rem" }}
            type="submit"
            onClick={() => saveStudentModel()}
            className="btn btn-success"
          >
            Register/Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
