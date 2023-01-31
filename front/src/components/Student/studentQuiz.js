import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StudentQuizService } from "../../services/studentQuizService";
import { StudentModel } from "../../models/student";

export function StudentQuiz() {
  let { id } = useParams();

  const service = StudentQuizService();

  const [newStudent, setStudent] = useState(StudentModel);

  let navigate = useNavigate();
  useEffect(() => {}, []);

  async function saveDataStudent() {
    const arr = await service.getStudents();
    setStudent(arr);
  }

  const changeModel = (e) => {
    let tmp = { ...newStudent };
    tmp[e.target.name] = e.target.value;
    setStudent(tmp);
    console.log(tmp);
  };

  const saveStudentModel = () => {
    let tmp = { ...newStudent };
    setStudent(tmp);
    postStudent(tmp).then((resp) => {
      console.log(resp);
      // navigate("../questionsPage");
    });

    navigate("/startQuiz");
  };

  async function postStudent(student) {
    await service.checkAddStudent(student);
  }

  return (
    <div>
      <h1>hello! Sign Up Quiz</h1>
      <div>
        <div>
          first name
          <input
            type="text"
            value={newStudent.fname}
            onChange={changeModel}
            name="fname"
            required
          />
        </div>

        <div>
          last name
          <input
            value={newStudent.lname}
            onChange={changeModel}
            type="text"
            name="lname"
            required
          />
        </div>
        <div>
          E-mail
          <input
            value={newStudent.email}
            onChange={changeModel}
            type="email"
            name="email"
            pattern="/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/"
            required
          />
        </div>
        <button
          type="submit"
          onClick={() => saveStudentModel()}
          className="btn btn-success"
        >
          Start
        </button>
      </div>
    </div>
  );
}
